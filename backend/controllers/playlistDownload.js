const puppeteer = require('puppeteer');
const youtubedl = require('youtube-dl-exec');
const fs = require('fs');
const path = require('path');

// Function to clean filenames (remove invalid characters)
function sanitizeFilename(name) {
    return name.replace(/[\/:*?"<>|]/g, '').trim();
}

// Function to fetch all video links from a playlist
async function getPlaylistVideos(playlistUrl) {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();

    console.log('📂 Fetching playlist details...');
    await page.goto(playlistUrl, { waitUntil: 'networkidle2' });

    console.log('📜 Scrolling to load all videos...');
    let lastHeight = await page.evaluate('document.documentElement.scrollHeight');
    while (true) {
        await page.evaluate('window.scrollTo(0, document.documentElement.scrollHeight)');
        await new Promise(resolve => setTimeout(resolve, 2000));
        let newHeight = await page.evaluate('document.documentElement.scrollHeight');
        if (newHeight === lastHeight) break;
        lastHeight = newHeight;
    }

    console.log('🔍 Extracting all video links...');
    const videos = await page.evaluate(() => {
        return Array.from(document.querySelectorAll('#video-title'))
            .map(video => ({
                title: video.textContent.trim(),
                url: 'https://www.youtube.com' + video.getAttribute('href'),
            }))
            .filter(video => video.url.includes('watch'));
    });

    await browser.close();

    console.log(`🎥 Playlist contains ${videos.length} videos.`);
    return videos;
}

// Function to download a single video
async function downloadVideo(video, index, totalVideos, downloadFolder) {
    const videoTitle = sanitizeFilename(video.title);
    const filePath = path.join(downloadFolder, `${index + 1}. ${videoTitle}.mp4`);

    console.log(`\n📥 (${index + 1}/${totalVideos}) Downloading: ${video.title}...`);

    try {
        await youtubedl(video.url, {
            output: filePath,
            format: 'best[ext=mp4]', // Ensures video + audio in one file
        });

        console.log(`✅ (${index + 1}/${totalVideos}) Downloaded: ${videoTitle}.mp4`);
    } catch (error) {
        console.error(`❌ Error downloading: ${video.title}`, error);
    }
}

// Function to process the playlist
async function processPlaylist(req, res) {
    const { playlistUrl } = req.body;
    if (!playlistUrl) return res.status(400).json({ error: 'Playlist URL is required' });

    console.log(`\n🔗 Received Playlist: ${playlistUrl}`);

    try {
        const videos = await getPlaylistVideos(playlistUrl);
        if (!videos.length) return res.status(404).json({ error: 'No videos found in the playlist' });

        const downloadFolder = path.join(__dirname, '../downloads');
        if (!fs.existsSync(downloadFolder)) {
            fs.mkdirSync(downloadFolder, { recursive: true });
        }

        console.log(`🚀 Starting downloads... Total Videos: ${videos.length}\n`);

        for (let i = 0; i < videos.length; i++) {
            await downloadVideo(videos[i], i, videos.length, downloadFolder);
        }

        console.log('\n🎉 All videos downloaded successfully!');
        res.json({ message: 'Download completed successfully!', totalVideos: videos.length });
    } catch (error) {
        console.error('❌ Error processing request:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

module.exports = { processPlaylist };