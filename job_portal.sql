-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Feb 14, 2025 at 10:21 AM
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
-- Table structure for table `company`
--

CREATE TABLE `company` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `company`
--

INSERT INTO `company` (`id`, `name`) VALUES
(3, 'Amazon'),
(68, 'FlipKart'),
(70, 'GoDaddy'),
(67, 'Google'),
(71, 'Hostinger');

-- --------------------------------------------------------

--
-- Table structure for table `company_profile`
--

CREATE TABLE `company_profile` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `url` varchar(512) DEFAULT NULL,
  `image` varchar(512) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `company_profile`
--

INSERT INTO `company_profile` (`id`, `name`, `description`, `url`, `image`) VALUES
(1, 'Amazon', 'Leading provider of innovative widgets and gadgets.', 'https://www.amazone.com', '1739514874695-01cada77a0a7d326d85b7969fe26a728.jpg'),
(2, 'FlipKart', 'Specializing in cutting-edge technology solutions for the modern enterprise.', 'https://www.flipkart.com/', '1739523950617-hd-flipkart-round-logo-icon-transparent-png-701751694966204grvmunpzzf.png'),
(6, 'Google', 'WWW company\n', 'www.google.com', '1739514719344-Google__G__logo.svg.png'),
(13, 'GoDaddy', 'NA', 'https://www.godaddy.com/', '1739514949926-godaddy-v2-icon-2048x2048-fnx09smt.png');

-- --------------------------------------------------------

--
-- Table structure for table `job_apply_list`
--

CREATE TABLE `job_apply_list` (
  `id` int(11) NOT NULL,
  `company_name` varchar(255) NOT NULL,
  `user_name` varchar(255) NOT NULL,
  `position_name` varchar(255) NOT NULL,
  `apply_date` date NOT NULL,
  `resume` varchar(512) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `job_apply_list`
--

INSERT INTO `job_apply_list` (`id`, `company_name`, `user_name`, `position_name`, `apply_date`, `resume`, `created_at`) VALUES
(3, 'Amazon', 'Mike Johnson', 'Cloud Architect', '2025-02-08', 'resume_mike.pdf', '2025-02-11 06:48:47');

-- --------------------------------------------------------

--
-- Table structure for table `job_open_list`
--

CREATE TABLE `job_open_list` (
  `id` int(11) NOT NULL,
  `company_name` varchar(255) NOT NULL,
  `position_desc` text NOT NULL,
  `position_skills` text NOT NULL,
  `position_open_date` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `job_open_list`
--

INSERT INTO `job_open_list` (`id`, `company_name`, `position_desc`, `position_skills`, `position_open_date`) VALUES
(3, 'Amazon', 'Manage cloud infrastructure', 'AWS, DevOps, Linux', '2025-02-03');

-- --------------------------------------------------------

--
-- Table structure for table `job_position`
--

CREATE TABLE `job_position` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `created` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `job_position`
--

INSERT INTO `job_position` (`id`, `name`, `created`) VALUES
(1, 'Software Engineer', '2025-02-14 12:50:46'),
(2, 'Data Analyst', '2025-02-14 12:50:46'),
(3, 'Product Manager', '2025-02-14 12:50:46'),
(4, 'UI/UX Designer', '2025-02-14 12:50:46'),
(5, 'DevOps Engineer', '2025-02-14 12:50:46'),
(6, 'Cybersecurity Specialist', '2025-02-14 12:50:46'),
(7, 'Marketing Manager', '2025-02-14 12:50:46'),
(8, 'HR Executive', '2025-02-14 12:50:46'),
(9, 'Finance Analyst', '2025-02-14 12:50:46');

-- --------------------------------------------------------

--
-- Table structure for table `positions_desc`
--

CREATE TABLE `positions_desc` (
  `id` int(11) NOT NULL,
  `open_positions` varchar(255) NOT NULL,
  `no_of_open_positions` int(11) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `positions_desc`
--

INSERT INTO `positions_desc` (`id`, `open_positions`, `no_of_open_positions`) VALUES
(1, 'Software Engineer', 5),
(2, 'Data Scientist', 3),
(3, 'Product Manager', 2),
(4, 'UX Designer', 4),
(5, 'Cloud Architect', 3);

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
  `file_upload` varchar(512) DEFAULT NULL,
  `number` varchar(20) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `password`, `role`, `file_upload`, `number`, `created_at`) VALUES
(2, 'Jane Smith', 'jane@example.com', 'password456', 'recruiter', '1739512097462-01.jpg', '0987654321', '2025-02-14 05:48:17'),
(3, 'Mike Johnson', 'mike@example.com', 'password789', 'recruiter', '1739512100698-01.jpg', '5678901234', '2025-02-14 05:48:20'),
(4, 'Alice Brown', 'alice@example.com', 'passwordabc', 'student', '1739512109900-04.jpg', '6789012345', '2025-02-14 05:48:29'),
(5, 'Bob Martin', 'bob@example.com', 'bob@example.com', 'recruiter', '1739512117057-1738918870609-04.jpg', '7890123456', '2025-02-14 05:48:37'),
(6, 'harsh', 'harsh@gmail.com', '$2a$10$Z3/7TbOMH.2ngO/o01xAiO3YSmEaM.HYwkG0MrDn3FGkt.uLTLYny', 'admin', '1739512124922-04.jpg', '1234567890', '2025-02-14 05:48:44'),
(8, 'condescending jemison 123', 'condescendingjemison1@tomorjerry.com', '$2a$10$hjZKtIdjxuVl97dl33Gtu.Z3CsEEOSp7yFciWQ5m5lCx/9CWEthF2', 'admin', '1739512131736-03.jpg', '1234567890', '2025-02-14 05:48:51');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `company`
--
ALTER TABLE `company`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Indexes for table `company_profile`
--
ALTER TABLE `company_profile`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_company_profile_name` (`name`);

--
-- Indexes for table `job_apply_list`
--
ALTER TABLE `job_apply_list`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_apply_company` (`company_name`),
  ADD KEY `fk_apply_user` (`user_name`),
  ADD KEY `fk_apply_position` (`position_name`);

--
-- Indexes for table `job_open_list`
--
ALTER TABLE `job_open_list`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_job_open_company` (`company_name`);

--
-- Indexes for table `job_position`
--
ALTER TABLE `job_position`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `positions_desc`
--
ALTER TABLE `positions_desc`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `open_positions` (`open_positions`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `name` (`name`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `company`
--
ALTER TABLE `company`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=72;

--
-- AUTO_INCREMENT for table `company_profile`
--
ALTER TABLE `company_profile`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `job_apply_list`
--
ALTER TABLE `job_apply_list`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `job_open_list`
--
ALTER TABLE `job_open_list`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `job_position`
--
ALTER TABLE `job_position`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `positions_desc`
--
ALTER TABLE `positions_desc`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `company_profile`
--
ALTER TABLE `company_profile`
  ADD CONSTRAINT `fk_company_profile_name` FOREIGN KEY (`name`) REFERENCES `company` (`name`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `job_apply_list`
--
ALTER TABLE `job_apply_list`
  ADD CONSTRAINT `fk_apply_company` FOREIGN KEY (`company_name`) REFERENCES `company` (`name`) ON DELETE CASCADE,
  ADD CONSTRAINT `fk_apply_position` FOREIGN KEY (`position_name`) REFERENCES `positions_desc` (`open_positions`) ON DELETE CASCADE,
  ADD CONSTRAINT `fk_apply_user` FOREIGN KEY (`user_name`) REFERENCES `users` (`name`) ON DELETE CASCADE;

--
-- Constraints for table `job_open_list`
--
ALTER TABLE `job_open_list`
  ADD CONSTRAINT `fk_job_open_company` FOREIGN KEY (`company_name`) REFERENCES `company` (`name`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
