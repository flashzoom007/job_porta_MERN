-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Feb 04, 2025 at 01:30 PM
-- Server version: 10.4.27-MariaDB
-- PHP Version: 8.1.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `job_portal`
--

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` enum('admin','student','recruiter') NOT NULL,
  `file_upload` varchar(255) DEFAULT NULL,
  `number` int(11) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `password`, `role`, `file_upload`, `number`, `created_at`) VALUES
(8, 'Creative James', 'creativejames4@outlook.com', 'codeStrong3', 'admin', 'undefined', 2147483647, '2025-02-03 09:23:19'),
(9, 'Dynamic Foster', 'dynamicfoster9@hireme.com', 'dynamic2023', 'student', 'undefined', 2147483647, '2025-02-03 09:23:23'),
(17, 'Focused Young', 'focusedyoung5@careerfinders.com', 'goalGetters9', 'student', 'undefined', 1587423690, '2025-02-04 09:44:52'),
(18, 'John Doe', 'johndoe@studentmail.com', 'StudentPass123', 'student', 'profilepic1.jpg', 2147483647, '2025-02-04 09:46:25'),
(19, 'Anna Smith', 'recruiteranna@jobportal.com', 'RecruiterPass456', 'recruiter', 'resume.pdf', 1234567890, '2025-02-04 09:46:29'),
(20, 'Michael Johnson', 'admin@company.com', 'AdminPass789', 'admin', 'adminprofile.jpg', 1122334455, '2025-02-04 09:46:32'),
(21, 'Emily Davis', 'emilystudent1@school.com', 'StudentPass1', 'student', 'profilepic1.jpg', 2147483647, '2025-02-04 09:46:47'),
(22, 'John Williams', 'johnrecruiter2@company.com', 'RecruiterPass2', 'recruiter', 'resume1.pdf', 2147483647, '2025-02-04 09:46:54'),
(23, 'Sarah Lee', 'admin1@admin.com', 'AdminPass1', 'admin', 'adminprofile1.jpg', 2147483647, '2025-02-04 09:47:00'),
(24, 'Mark Thompson', 'markstudent2@school.com', 'StudentPass2', 'student', 'profilepic2.jpg', 2147483647, '2025-02-04 09:47:03'),
(25, 'David Clark', 'davidrecruiter3@company.com', 'RecruiterPass3', 'recruiter', 'resume2.pdf', 2147483647, '2025-02-04 09:47:12'),
(26, 'Linda Scott', 'admin2@admin.com', 'AdminPass2', 'admin', 'adminprofile2.jpg', 2147483647, '2025-02-04 09:47:15'),
(27, 'Olivia Rose', 'oliviarose@school.com', 'StudentPass3', 'student', 'profilepic3.jpg', 2147483647, '2025-02-04 09:47:19'),
(28, 'Matthew Turner', 'matthewhire@company.com', 'RecruiterPass4', 'recruiter', 'resume3.pdf', 2147483647, '2025-02-04 09:47:23'),
(29, 'James Hall', 'admin3@admin.com', 'AdminPass3', 'admin', 'adminprofile3.jpg', 1234567890, '2025-02-04 09:47:26'),
(30, 'Sophia Carter', 'sophia.student4@school.com', 'StudentPass4', 'student', 'profilepic4.jpg', 2147483647, '2025-02-04 09:47:29');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
