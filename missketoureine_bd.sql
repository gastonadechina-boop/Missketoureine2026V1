-- phpMyAdmin SQL Dump
-- version 5.2.3deb1
-- https://www.phpmyadmin.net/
--
-- Hôte : localhost:3306
-- Généré le : jeu. 09 avr. 2026 à 12:26
-- Version du serveur : 11.8.6-MariaDB-2 from Debian
-- Version de PHP : 8.4.16

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `missandmister_bd`
--

-- --------------------------------------------------------

--
-- Structure de la table `activity_logs`
--

CREATE TABLE `activity_logs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `causer_type` varchar(255) DEFAULT NULL,
  `causer_id` bigint(20) UNSIGNED DEFAULT NULL,
  `subject_type` varchar(255) DEFAULT NULL,
  `subject_id` bigint(20) UNSIGNED DEFAULT NULL,
  `action` varchar(255) NOT NULL,
  `ip_address` varchar(45) DEFAULT NULL,
  `meta` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`meta`)),
  `status` enum('active','inactive') NOT NULL DEFAULT 'active',
  `deleted_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `activity_logs`
--

INSERT INTO `activity_logs` (`id`, `causer_type`, `causer_id`, `subject_type`, `subject_id`, `action`, `ip_address`, `meta`, `status`, `deleted_at`, `created_at`, `updated_at`) VALUES
(1, 'App\\Models\\Admin', NULL, NULL, NULL, 'login_failed', '127.0.0.1', '{\"guard\":\"user\"}', 'active', NULL, '2026-03-14 16:58:26', '2026-03-14 16:58:26'),
(2, 'App\\Models\\Admin', NULL, NULL, NULL, 'login_failed', '127.0.0.1', '{\"guard\":\"user\"}', 'active', NULL, '2026-03-14 16:58:31', '2026-03-14 16:58:31'),
(3, 'App\\Models\\Admin', NULL, NULL, NULL, 'login_failed', '127.0.0.1', '{\"guard\":\"user\"}', 'active', NULL, '2026-03-14 16:58:35', '2026-03-14 16:58:35'),
(4, 'App\\Models\\Admin', NULL, NULL, NULL, 'login_failed', '127.0.0.1', '{\"guard\":\"user\"}', 'active', NULL, '2026-03-14 16:58:39', '2026-03-14 16:58:39'),
(5, 'App\\Models\\Admin', NULL, NULL, NULL, 'login_failed', '127.0.0.1', '{\"guard\":\"user\"}', 'active', NULL, '2026-03-14 16:58:42', '2026-03-14 16:58:42'),
(6, 'App\\Models\\User', 1, NULL, NULL, 'login_success', '127.0.0.1', '{\"role\":\"user\"}', 'active', NULL, '2026-03-14 17:06:55', '2026-03-14 17:06:55'),
(7, 'App\\Models\\Admin', NULL, NULL, NULL, 'login_failed', '127.0.0.1', '{\"guard\":\"user\"}', 'active', NULL, '2026-03-14 17:15:16', '2026-03-14 17:15:16'),
(8, 'App\\Models\\Admin', NULL, NULL, NULL, 'login_failed', '127.0.0.1', '{\"guard\":\"user\"}', 'active', NULL, '2026-03-14 17:15:44', '2026-03-14 17:15:44'),
(9, 'App\\Models\\Admin', 1, NULL, NULL, 'login_success', '127.0.0.1', '{\"guard\":\"admin\"}', 'active', NULL, '2026-03-14 17:16:18', '2026-03-14 17:16:18'),
(10, 'App\\Models\\Admin', 1, NULL, NULL, 'login_success', '127.0.0.1', '{\"guard\":\"admin\"}', 'active', NULL, '2026-03-14 17:28:55', '2026-03-14 17:28:55'),
(11, 'App\\Models\\Admin', 1, NULL, NULL, 'login_success', '127.0.0.1', '{\"guard\":\"admin\"}', 'active', NULL, '2026-03-14 17:29:28', '2026-03-14 17:29:28'),
(12, 'App\\Models\\Admin', 1, NULL, NULL, 'login_success', '127.0.0.1', '{\"guard\":\"admin\"}', 'active', NULL, '2026-03-14 17:37:16', '2026-03-14 17:37:16'),
(13, 'App\\Models\\Admin', 1, NULL, NULL, 'login_success', '127.0.0.1', '{\"guard\":\"admin\"}', 'active', NULL, '2026-03-14 17:43:46', '2026-03-14 17:43:46'),
(14, 'App\\Models\\Admin', 1, NULL, NULL, 'login_success', '127.0.0.1', '{\"guard\":\"admin\"}', 'active', NULL, '2026-03-14 18:08:46', '2026-03-14 18:08:46'),
(15, 'App\\Models\\Admin', 1, NULL, NULL, 'login_success', '127.0.0.1', '{\"guard\":\"admin\"}', 'active', NULL, '2026-03-14 18:08:58', '2026-03-14 18:08:58'),
(16, 'App\\Models\\User', 1, NULL, NULL, 'login_success', '127.0.0.1', '{\"role\":\"user\"}', 'active', NULL, '2026-03-14 18:09:37', '2026-03-14 18:09:37'),
(17, 'App\\Models\\Admin', 1, NULL, NULL, 'login_success', '127.0.0.1', '{\"guard\":\"admin\"}', 'active', NULL, '2026-03-14 18:34:28', '2026-03-14 18:34:28'),
(18, 'App\\Models\\Admin', NULL, NULL, NULL, 'login_failed', '127.0.0.1', '{\"guard\":\"user\"}', 'active', NULL, '2026-03-14 18:38:42', '2026-03-14 18:38:42'),
(19, 'App\\Models\\Admin', 1, NULL, NULL, 'login_success', '127.0.0.1', '{\"guard\":\"admin\"}', 'active', NULL, '2026-03-14 18:52:23', '2026-03-14 18:52:23'),
(20, 'App\\Models\\Admin', 1, NULL, NULL, 'login_success', '127.0.0.1', '{\"guard\":\"admin\"}', 'active', NULL, '2026-03-14 20:13:07', '2026-03-14 20:13:07'),
(21, 'App\\Models\\Admin', 1, NULL, NULL, 'login_success', '127.0.0.1', '{\"guard\":\"admin\"}', 'active', NULL, '2026-03-14 21:54:39', '2026-03-14 21:54:39'),
(22, 'App\\Models\\Admin', 1, NULL, NULL, 'login_success', '127.0.0.1', '{\"guard\":\"admin\"}', 'active', NULL, '2026-03-15 08:24:39', '2026-03-15 08:24:39'),
(23, 'App\\Models\\Admin', 1, NULL, NULL, 'login_success', '127.0.0.1', '{\"guard\":\"admin\"}', 'active', NULL, '2026-03-15 10:26:09', '2026-03-15 10:26:09'),
(24, 'App\\Models\\Admin', 1, NULL, NULL, 'login_success', '127.0.0.1', '{\"guard\":\"admin\"}', 'active', NULL, '2026-03-15 13:41:05', '2026-03-15 13:41:05'),
(25, 'App\\Models\\Admin', 3, NULL, NULL, 'login_success', '127.0.0.1', '{\"guard\":\"admin\"}', 'active', NULL, '2026-03-16 09:16:04', '2026-03-16 09:16:04'),
(26, 'App\\Models\\Admin', 3, NULL, NULL, 'login_success', '127.0.0.1', '{\"guard\":\"admin\"}', 'active', NULL, '2026-03-16 09:17:28', '2026-03-16 09:17:28'),
(27, 'App\\Models\\Admin', 1, NULL, NULL, 'login_failed', '127.0.0.1', '{\"guard\":\"admin\"}', 'active', NULL, '2026-03-16 09:22:46', '2026-03-16 09:22:46'),
(28, 'App\\Models\\Admin', 3, NULL, NULL, 'login_success', '127.0.0.1', '{\"guard\":\"admin\"}', 'active', NULL, '2026-03-16 09:23:10', '2026-03-16 09:23:10'),
(29, 'App\\Models\\Admin', 3, NULL, NULL, 'login_success', '127.0.0.1', '{\"guard\":\"admin\"}', 'active', NULL, '2026-03-16 09:38:16', '2026-03-16 09:38:16'),
(30, 'App\\Models\\Admin', 3, NULL, NULL, 'login_success', '127.0.0.1', '{\"guard\":\"admin\"}', 'active', NULL, '2026-03-16 10:17:16', '2026-03-16 10:17:16'),
(31, 'App\\Models\\Admin', 3, NULL, NULL, 'login_success', '127.0.0.1', '{\"guard\":\"admin\"}', 'active', NULL, '2026-03-16 10:17:49', '2026-03-16 10:17:49'),
(32, 'App\\Models\\Admin', 3, NULL, NULL, 'login_success', '127.0.0.1', '{\"guard\":\"admin\"}', 'active', NULL, '2026-03-16 15:27:07', '2026-03-16 15:27:07'),
(33, 'App\\Models\\Admin', NULL, NULL, NULL, 'login_failed', '127.0.0.1', '{\"guard\":\"user\"}', 'active', NULL, '2026-03-29 14:24:57', '2026-03-29 14:24:57'),
(34, 'App\\Models\\Admin', 3, NULL, NULL, 'login_success', '127.0.0.1', '{\"guard\":\"admin\"}', 'active', NULL, '2026-03-29 14:41:38', '2026-03-29 14:41:38'),
(35, 'App\\Models\\Admin', 3, NULL, NULL, 'login_success', '127.0.0.1', '{\"guard\":\"admin\"}', 'active', NULL, '2026-03-29 14:41:52', '2026-03-29 14:41:52'),
(36, 'App\\Models\\Admin', 3, NULL, NULL, 'login_success', '127.0.0.1', '{\"guard\":\"admin\"}', 'active', NULL, '2026-03-29 14:45:03', '2026-03-29 14:45:03'),
(37, 'App\\Models\\Admin', 3, NULL, NULL, 'login_success', '127.0.0.1', '{\"guard\":\"admin\"}', 'active', NULL, '2026-03-29 14:45:42', '2026-03-29 14:45:42'),
(38, 'App\\Models\\Admin', 3, NULL, NULL, 'login_success', '127.0.0.1', '{\"guard\":\"admin\"}', 'active', NULL, '2026-03-29 15:17:10', '2026-03-29 15:17:10'),
(39, 'App\\Models\\Admin', 3, NULL, NULL, 'login_success', '127.0.0.1', '{\"guard\":\"admin\"}', 'active', NULL, '2026-03-30 09:33:52', '2026-03-30 09:33:52'),
(40, 'App\\Models\\Admin', NULL, NULL, NULL, 'login_failed', '127.0.0.1', '{\"guard\":\"user\"}', 'active', NULL, '2026-03-30 11:30:13', '2026-03-30 11:30:13'),
(41, 'App\\Models\\Admin', NULL, NULL, NULL, 'login_failed', '127.0.0.1', '{\"guard\":\"user\"}', 'active', NULL, '2026-03-30 11:30:18', '2026-03-30 11:30:18'),
(42, 'App\\Models\\Admin', NULL, NULL, NULL, 'login_failed', '127.0.0.1', '{\"guard\":\"user\"}', 'active', NULL, '2026-03-30 11:30:37', '2026-03-30 11:30:37'),
(43, 'App\\Models\\Admin', 3, NULL, NULL, 'login_success', '127.0.0.1', '{\"guard\":\"admin\"}', 'active', NULL, '2026-03-30 11:38:33', '2026-03-30 11:38:33'),
(44, 'App\\Models\\Admin', 3, NULL, NULL, 'login_success', '127.0.0.1', '{\"guard\":\"admin\"}', 'active', NULL, '2026-04-04 11:24:13', '2026-04-04 11:24:13'),
(45, 'App\\Models\\User', NULL, NULL, NULL, 'payment_initiated', '127.0.0.1', '{\"payment_id\":2,\"reference\":\"KUJOVD2TABDG\"}', 'active', NULL, '2026-04-04 12:54:55', '2026-04-04 12:54:55'),
(46, 'App\\Models\\User', NULL, NULL, NULL, 'vote_initiated', '127.0.0.1', '{\"candidate_id\":16,\"payment_id\":2,\"quantity\":1}', 'active', NULL, '2026-04-04 12:54:55', '2026-04-04 12:54:55'),
(47, 'App\\Models\\User', NULL, NULL, NULL, 'payment_initiated', '127.0.0.1', '{\"payment_id\":3,\"reference\":\"YZXKJYQOOW3Q\"}', 'active', NULL, '2026-04-04 12:55:24', '2026-04-04 12:55:24'),
(48, 'App\\Models\\User', NULL, NULL, NULL, 'vote_initiated', '127.0.0.1', '{\"candidate_id\":16,\"payment_id\":3,\"quantity\":2}', 'active', NULL, '2026-04-04 12:55:24', '2026-04-04 12:55:24'),
(49, 'App\\Models\\Admin', 3, NULL, NULL, 'login_success', '127.0.0.1', '{\"guard\":\"admin\"}', 'active', NULL, '2026-04-04 13:55:10', '2026-04-04 13:55:10'),
(50, 'App\\Models\\Admin', 3, NULL, NULL, 'login_success', '127.0.0.1', '{\"guard\":\"admin\"}', 'active', NULL, '2026-04-04 16:06:19', '2026-04-04 16:06:19'),
(51, 'App\\Models\\Admin', 3, NULL, NULL, 'login_success', '127.0.0.1', '{\"guard\":\"admin\"}', 'active', NULL, '2026-04-04 16:42:32', '2026-04-04 16:42:32'),
(52, 'App\\Models\\Admin', 3, NULL, NULL, 'login_success', '127.0.0.1', '{\"guard\":\"admin\"}', 'active', NULL, '2026-04-04 18:52:40', '2026-04-04 18:52:40'),
(53, 'App\\Models\\Admin', 3, NULL, NULL, 'login_success', '127.0.0.1', '{\"guard\":\"admin\"}', 'active', NULL, '2026-04-04 20:38:55', '2026-04-04 20:38:55'),
(54, 'App\\Models\\Admin', 3, NULL, NULL, 'login_success', '127.0.0.1', '{\"guard\":\"admin\"}', 'active', NULL, '2026-04-04 20:49:31', '2026-04-04 20:49:31'),
(55, 'App\\Models\\Admin', NULL, NULL, NULL, 'login_failed', '127.0.0.1', '{\"guard\":\"user\"}', 'active', NULL, '2026-04-04 20:54:50', '2026-04-04 20:54:50'),
(56, 'App\\Models\\Admin', NULL, NULL, NULL, 'login_failed', '127.0.0.1', '{\"guard\":\"user\"}', 'active', NULL, '2026-04-04 20:54:54', '2026-04-04 20:54:54'),
(57, 'App\\Models\\Admin', NULL, NULL, NULL, 'login_failed', '127.0.0.1', '{\"guard\":\"user\"}', 'active', NULL, '2026-04-04 20:54:55', '2026-04-04 20:54:55'),
(58, 'App\\Models\\Admin', NULL, NULL, NULL, 'login_failed', '127.0.0.1', '{\"guard\":\"user\"}', 'active', NULL, '2026-04-04 20:54:55', '2026-04-04 20:54:55'),
(59, 'App\\Models\\Admin', NULL, NULL, NULL, 'login_failed', '127.0.0.1', '{\"guard\":\"user\"}', 'active', NULL, '2026-04-04 20:54:56', '2026-04-04 20:54:56'),
(60, 'App\\Models\\Admin', 3, NULL, NULL, 'login_success', '127.0.0.1', '{\"guard\":\"admin\"}', 'active', NULL, '2026-04-04 20:56:26', '2026-04-04 20:56:26'),
(61, 'App\\Models\\Admin', 3, NULL, NULL, 'logout', '127.0.0.1', '[]', 'active', NULL, '2026-04-04 21:10:55', '2026-04-04 21:10:55'),
(62, 'App\\Models\\Admin', 3, NULL, NULL, 'login_success', '127.0.0.1', '{\"guard\":\"admin\"}', 'active', NULL, '2026-04-04 21:11:08', '2026-04-04 21:11:08'),
(63, 'App\\Models\\Admin', NULL, NULL, NULL, 'login_failed', '127.0.0.1', '{\"guard\":\"user\"}', 'active', NULL, '2026-04-04 21:22:30', '2026-04-04 21:22:30'),
(64, 'App\\Models\\Admin', 3, NULL, NULL, 'login_success', '127.0.0.1', '{\"guard\":\"admin\"}', 'active', NULL, '2026-04-04 21:25:08', '2026-04-04 21:25:08'),
(65, 'App\\Models\\Admin', 3, NULL, NULL, 'login_success', '127.0.0.1', '{\"guard\":\"admin\"}', 'active', NULL, '2026-04-04 23:36:56', '2026-04-04 23:36:56'),
(66, 'App\\Models\\Admin', 3, NULL, NULL, 'logout', '127.0.0.1', '[]', 'active', NULL, '2026-04-04 23:54:05', '2026-04-04 23:54:05'),
(67, 'App\\Models\\Admin', 3, NULL, NULL, 'login_success', '127.0.0.1', '{\"guard\":\"admin\"}', 'active', NULL, '2026-04-05 00:14:28', '2026-04-05 00:14:28'),
(68, 'App\\Models\\Admin', 3, NULL, NULL, 'logout', '127.0.0.1', '[]', 'active', NULL, '2026-04-05 00:15:14', '2026-04-05 00:15:14'),
(69, 'App\\Models\\Admin', NULL, NULL, NULL, 'login_failed', '127.0.0.1', '{\"guard\":\"user\"}', 'active', NULL, '2026-04-05 00:15:56', '2026-04-05 00:15:56'),
(70, 'App\\Models\\Admin', 3, NULL, NULL, 'login_success', '127.0.0.1', '{\"guard\":\"admin\"}', 'active', NULL, '2026-04-05 00:16:04', '2026-04-05 00:16:04'),
(71, 'App\\Models\\Admin', 3, NULL, NULL, 'login_success', '127.0.0.1', '{\"guard\":\"admin\"}', 'active', NULL, '2026-04-05 16:19:46', '2026-04-05 16:19:46'),
(72, 'App\\Models\\Admin', 3, NULL, NULL, 'logout', '127.0.0.1', '[]', 'active', NULL, '2026-04-05 17:15:23', '2026-04-05 17:15:23'),
(73, 'App\\Models\\Admin', 3, NULL, NULL, 'login_success', '127.0.0.1', '{\"guard\":\"admin\"}', 'active', NULL, '2026-04-05 17:36:42', '2026-04-05 17:36:42'),
(74, 'App\\Models\\Admin', 3, NULL, NULL, 'logout', '127.0.0.1', '[]', 'active', NULL, '2026-04-05 17:52:51', '2026-04-05 17:52:51'),
(75, 'App\\Models\\Admin', 3, NULL, NULL, 'login_success', '127.0.0.1', '{\"guard\":\"admin\"}', 'active', NULL, '2026-04-05 18:02:58', '2026-04-05 18:02:58'),
(76, 'App\\Models\\Admin', 3, NULL, NULL, 'logout', '127.0.0.1', '[]', 'active', NULL, '2026-04-05 18:32:51', '2026-04-05 18:32:51'),
(77, 'App\\Models\\Admin', 3, NULL, NULL, 'login_success', '127.0.0.1', '{\"guard\":\"admin\"}', 'active', NULL, '2026-04-05 19:53:28', '2026-04-05 19:53:28'),
(78, 'App\\Models\\Admin', 3, NULL, NULL, 'logout', '127.0.0.1', '[]', 'active', NULL, '2026-04-05 19:53:56', '2026-04-05 19:53:56'),
(79, 'App\\Models\\User', 7, NULL, NULL, 'login_success', '127.0.0.1', '{\"role\":\"user\"}', 'active', NULL, '2026-04-05 20:24:37', '2026-04-05 20:24:37'),
(80, 'App\\Models\\User', 7, NULL, NULL, 'logout', '127.0.0.1', '[]', 'active', NULL, '2026-04-05 20:25:04', '2026-04-05 20:25:04'),
(81, 'App\\Models\\User', 7, NULL, NULL, 'login_success', '127.0.0.1', '{\"role\":\"user\"}', 'active', NULL, '2026-04-05 20:25:33', '2026-04-05 20:25:33'),
(82, 'App\\Models\\Admin', NULL, NULL, NULL, 'login_failed', '127.0.0.1', '{\"guard\":\"admin\"}', 'active', NULL, '2026-04-05 20:27:06', '2026-04-05 20:27:06'),
(83, 'App\\Models\\Admin', 3, NULL, NULL, 'login_success', '127.0.0.1', '{\"guard\":\"admin\"}', 'active', NULL, '2026-04-05 20:27:15', '2026-04-05 20:27:15'),
(84, 'App\\Models\\Admin', 3, NULL, NULL, 'logout', '127.0.0.1', '[]', 'active', NULL, '2026-04-05 20:30:50', '2026-04-05 20:30:50'),
(85, 'App\\Models\\User', 7, NULL, NULL, 'login_success', '127.0.0.1', '{\"role\":\"user\"}', 'active', NULL, '2026-04-05 20:34:26', '2026-04-05 20:34:26'),
(86, 'App\\Models\\User', 7, NULL, NULL, 'logout', '127.0.0.1', '[]', 'active', NULL, '2026-04-05 21:09:15', '2026-04-05 21:09:15'),
(87, 'App\\Models\\Admin', NULL, NULL, NULL, 'login_failed', '127.0.0.1', '{\"guard\":\"admin\"}', 'active', NULL, '2026-04-05 21:09:29', '2026-04-05 21:09:29'),
(88, 'App\\Models\\Admin', 3, NULL, NULL, 'login_success', '127.0.0.1', '{\"guard\":\"admin\"}', 'active', NULL, '2026-04-05 21:09:34', '2026-04-05 21:09:34'),
(89, 'App\\Models\\User', 7, NULL, NULL, 'login_success', '127.0.0.1', '{\"role\":\"user\"}', 'active', NULL, '2026-04-05 21:09:57', '2026-04-05 21:09:57'),
(90, 'App\\Models\\User', 7, NULL, NULL, 'logout', '127.0.0.1', '[]', 'active', NULL, '2026-04-05 21:10:05', '2026-04-05 21:10:05'),
(91, 'App\\Models\\User', 7, NULL, NULL, 'login_success', '127.0.0.1', '{\"role\":\"user\"}', 'active', NULL, '2026-04-05 21:10:10', '2026-04-05 21:10:10'),
(92, 'App\\Models\\User', 7, NULL, NULL, 'logout', '127.0.0.1', '[]', 'active', NULL, '2026-04-05 21:12:32', '2026-04-05 21:12:32'),
(93, 'App\\Models\\User', 7, NULL, NULL, 'login_success', '127.0.0.1', '{\"role\":\"user\"}', 'active', NULL, '2026-04-05 21:12:39', '2026-04-05 21:12:39'),
(94, 'App\\Models\\User', 7, NULL, NULL, 'logout', '127.0.0.1', '[]', 'active', NULL, '2026-04-05 21:36:06', '2026-04-05 21:36:06'),
(95, 'App\\Models\\Admin', NULL, NULL, NULL, 'login_failed', '127.0.0.1', '{\"guard\":\"admin\"}', 'active', NULL, '2026-04-08 13:38:14', '2026-04-08 13:38:14'),
(96, 'App\\Models\\Admin', 3, NULL, NULL, 'login_success', '127.0.0.1', '{\"guard\":\"admin\"}', 'active', NULL, '2026-04-08 13:38:20', '2026-04-08 13:38:20'),
(97, 'App\\Models\\Admin', 3, NULL, NULL, 'login_success', '127.0.0.1', '{\"guard\":\"admin\"}', 'active', NULL, '2026-04-08 15:51:55', '2026-04-08 15:51:55'),
(98, 'App\\Models\\User', 8, NULL, NULL, 'login_failed', '127.0.0.1', '{\"guard\":\"user\"}', 'active', NULL, '2026-04-08 16:42:50', '2026-04-08 16:42:50'),
(99, 'App\\Models\\User', 8, NULL, NULL, 'login_failed', '127.0.0.1', '{\"guard\":\"user\"}', 'active', NULL, '2026-04-08 16:43:02', '2026-04-08 16:43:02'),
(100, 'App\\Models\\User', 8, NULL, NULL, 'login_failed', '127.0.0.1', '{\"guard\":\"user\"}', 'active', NULL, '2026-04-08 16:43:06', '2026-04-08 16:43:06'),
(101, 'App\\Models\\User', 8, NULL, NULL, 'login_failed', '127.0.0.1', '{\"guard\":\"user\"}', 'active', NULL, '2026-04-08 16:43:15', '2026-04-08 16:43:15'),
(102, 'App\\Models\\User', 8, NULL, NULL, 'login_success', '127.0.0.1', '{\"role\":\"candidate\"}', 'active', NULL, '2026-04-08 16:43:19', '2026-04-08 16:43:19'),
(103, 'App\\Models\\User', 8, NULL, NULL, 'password_changed', '127.0.0.1', '{\"guard\":\"candidate\"}', 'active', NULL, '2026-04-08 16:46:46', '2026-04-08 16:46:46'),
(104, 'App\\Models\\User', 8, NULL, NULL, 'logout', '127.0.0.1', '[]', 'active', NULL, '2026-04-08 16:49:04', '2026-04-08 16:49:04'),
(105, 'App\\Models\\User', 8, NULL, NULL, 'login_success', '127.0.0.1', '{\"role\":\"candidate\"}', 'active', NULL, '2026-04-08 16:49:09', '2026-04-08 16:49:09'),
(106, 'App\\Models\\User', 8, NULL, NULL, 'logout', '127.0.0.1', '[]', 'active', NULL, '2026-04-08 16:49:35', '2026-04-08 16:49:35'),
(107, 'App\\Models\\Admin', 3, NULL, NULL, 'login_success', '127.0.0.1', '{\"guard\":\"admin\"}', 'active', NULL, '2026-04-08 16:49:43', '2026-04-08 16:49:43'),
(108, 'App\\Models\\Admin', 3, NULL, NULL, 'login_success', '127.0.0.1', '{\"guard\":\"admin\"}', 'active', NULL, '2026-04-08 16:49:55', '2026-04-08 16:49:55'),
(109, 'App\\Models\\Admin', 3, NULL, NULL, 'logout', '127.0.0.1', '[]', 'active', NULL, '2026-04-08 16:53:13', '2026-04-08 16:53:13'),
(110, 'App\\Models\\Admin', 3, NULL, NULL, 'login_success', '127.0.0.1', '{\"guard\":\"admin\"}', 'active', NULL, '2026-04-08 17:07:08', '2026-04-08 17:07:08'),
(111, 'App\\Models\\Admin', 3, NULL, NULL, 'login_success', '127.0.0.1', '{\"guard\":\"admin\"}', 'active', NULL, '2026-04-08 19:28:05', '2026-04-08 19:28:05'),
(112, 'App\\Models\\User', 8, NULL, NULL, 'login_success', '127.0.0.1', '{\"role\":\"candidate\"}', 'active', NULL, '2026-04-08 19:46:38', '2026-04-08 19:46:38'),
(113, 'App\\Models\\User', 8, NULL, NULL, 'logout', '127.0.0.1', '[]', 'active', NULL, '2026-04-08 20:38:30', '2026-04-08 20:38:30'),
(114, 'App\\Models\\Admin', NULL, NULL, NULL, 'login_failed', '127.0.0.1', '{\"guard\":\"admin\"}', 'active', NULL, '2026-04-08 21:28:22', '2026-04-08 21:28:22'),
(115, 'App\\Models\\Admin', 3, NULL, NULL, 'login_success', '127.0.0.1', '{\"guard\":\"admin\"}', 'active', NULL, '2026-04-08 21:28:27', '2026-04-08 21:28:27'),
(116, 'App\\Models\\User', 8, NULL, NULL, 'login_success', '127.0.0.1', '{\"role\":\"candidate\"}', 'active', NULL, '2026-04-08 21:59:17', '2026-04-08 21:59:17'),
(117, 'App\\Models\\User', 8, NULL, NULL, 'logout', '127.0.0.1', '[]', 'active', NULL, '2026-04-08 21:59:50', '2026-04-08 21:59:50'),
(118, 'App\\Models\\Admin', NULL, NULL, NULL, 'login_failed', '127.0.0.1', '{\"guard\":\"admin\"}', 'active', NULL, '2026-04-09 03:53:36', '2026-04-09 03:53:36'),
(119, 'App\\Models\\Admin', 3, NULL, NULL, 'login_success', '127.0.0.1', '{\"guard\":\"admin\"}', 'active', NULL, '2026-04-09 03:53:41', '2026-04-09 03:53:41'),
(120, 'App\\Models\\User', 8, NULL, NULL, 'login_success', '127.0.0.1', '{\"role\":\"candidate\"}', 'active', NULL, '2026-04-09 04:41:45', '2026-04-09 04:41:45'),
(121, 'App\\Models\\User', 8, NULL, NULL, 'logout', '127.0.0.1', '[]', 'active', NULL, '2026-04-09 04:54:29', '2026-04-09 04:54:29'),
(122, 'App\\Models\\Admin', NULL, NULL, NULL, 'login_failed', '127.0.0.1', '{\"guard\":\"admin\"}', 'active', NULL, '2026-04-09 06:57:35', '2026-04-09 06:57:35');

-- --------------------------------------------------------

--
-- Structure de la table `admins`
--

CREATE TABLE `admins` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `role` enum('superadmin','admin') NOT NULL DEFAULT 'admin',
  `status` enum('active','inactive') NOT NULL DEFAULT 'active',
  `remember_token` varchar(100) DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `admins`
--

INSERT INTO `admins` (`id`, `name`, `email`, `phone`, `password`, `role`, `status`, `remember_token`, `deleted_at`, `created_at`, `updated_at`) VALUES
(1, 'Super Admin', 'admin@example.com', '0700000001', '$2y$12$o/ls0BPoM8BAlck/nu35t.lYSzHpvktyNek94BCscse94J9JVL7B6', 'superadmin', 'active', NULL, NULL, '2026-03-14 17:11:49', '2026-03-15 21:30:26'),
(3, 'Super Admin', 'admin@missandmister.test', '0000000000', '$2y$12$hn/Jh83hPSMH1CZZbSJSuuoi/J5SJWfk.FlMlC3MqJq2YVWgBBRo.', 'superadmin', 'active', NULL, NULL, '2026-03-16 09:14:34', '2026-03-16 09:14:34');

-- --------------------------------------------------------

--
-- Structure de la table `cache`
--

CREATE TABLE `cache` (
  `key` varchar(255) NOT NULL,
  `value` mediumtext NOT NULL,
  `expiration` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `cache`
--

INSERT INTO `cache` (`key`, `value`, `expiration`) VALUES
('laravel-cache-8afc448df3c0807bc0581d301998d551', 'i:1;', 1775427851),
('laravel-cache-8afc448df3c0807bc0581d301998d551:timer', 'i:1775427850;', 1775427850),
('laravel-cache-9b881373f0bc589298198f2aeed8897f', 'i:1;', 1775714080),
('laravel-cache-9b881373f0bc589298198f2aeed8897f:timer', 'i:1775714080;', 1775714080),
('laravel-cache-a0fe9b1748c771d0018b9a428b3d74f6', 'i:1;', 1775725115),
('laravel-cache-a0fe9b1748c771d0018b9a428b3d74f6:timer', 'i:1775725115;', 1775725115),
('laravel-cache-c0cff2958d90280533fde09da1143584', 'i:1;', 1775662754),
('laravel-cache-c0cff2958d90280533fde09da1143584:timer', 'i:1775662754;', 1775662754);

-- --------------------------------------------------------

--
-- Structure de la table `cache_locks`
--

CREATE TABLE `cache_locks` (
  `key` varchar(255) NOT NULL,
  `owner` varchar(255) NOT NULL,
  `expiration` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Structure de la table `candidates`
--

CREATE TABLE `candidates` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `public_number` int(10) UNSIGNED NOT NULL,
  `category_id` bigint(20) UNSIGNED NOT NULL,
  `first_name` varchar(255) NOT NULL,
  `last_name` varchar(255) NOT NULL,
  `slug` varchar(255) NOT NULL,
  `email` varchar(255) DEFAULT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `bio` text DEFAULT NULL,
  `photo_path` varchar(255) DEFAULT NULL,
  `photo_original_path` varchar(255) DEFAULT NULL,
  `photo_variants` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`photo_variants`)),
  `photo_meta` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`photo_meta`)),
  `photo_processing_status` varchar(255) NOT NULL DEFAULT 'idle',
  `photo_processing_error` text DEFAULT NULL,
  `video_path` varchar(255) DEFAULT NULL,
  `age` int(10) UNSIGNED DEFAULT NULL,
  `city` varchar(255) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `university` varchar(255) DEFAULT NULL,
  `status` enum('active','inactive') NOT NULL DEFAULT 'active',
  `is_active` tinyint(1) NOT NULL DEFAULT 1,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `candidates`
--

INSERT INTO `candidates` (`id`, `public_number`, `category_id`, `first_name`, `last_name`, `slug`, `email`, `phone`, `bio`, `photo_path`, `photo_original_path`, `photo_variants`, `photo_meta`, `photo_processing_status`, `photo_processing_error`, `video_path`, `age`, `city`, `description`, `university`, `status`, `is_active`, `deleted_at`, `created_at`, `updated_at`) VALUES
(16, 1, 2, 'ADE', 'CHINA', 'ade-china-yasd', 'ade@gmail.com', NULL, 'Boss', 'candidate-images/16/large/20260409065247-fd3b113bc5c7.webp', 'candidate-images/originals/ilPDFP2Y18nv1FNfqPkN1u4or3dtRByCFyNlTNJy.png', '{\"thumbnail\":\"candidate-images\\/16\\/thumbnail\\/20260409065245-7f0e26a858b1.webp\",\"medium\":\"candidate-images\\/16\\/medium\\/20260409065246-258cd1e7cfbc.webp\",\"large\":\"candidate-images\\/16\\/large\\/20260409065247-fd3b113bc5c7.webp\"}', '{\"source_width\":1024,\"source_height\":1536,\"mime\":\"image\\/png\",\"blur_score\":60.06,\"face\":null,\"face_detection_error\":\"La detection de visage est desactivee.\",\"processed_at\":\"2026-04-09T06:52:47+00:00\"}', 'ready', NULL, 'candidates/videos/UfKPQNcLrxikBJwemy6X3JRhAY0LanW7TRNkGPK6.mp4', 18, 'PORTO NOVO', 'Boss', 'ESCAE BENIN', 'active', 1, NULL, '2026-03-16 10:30:30', '2026-04-09 04:52:47'),
(17, 2, 1, 'Ines', 'GANDAHO', 'ines-ines-db1g', 'inesgandaho7@gmail.com', NULL, 'Je suis developpeuse Full stack', 'candidate-images/17/large/20260408181211-0dca5e3debdb.webp', 'candidate-images/originals/5ZmOMRIbtFPSMCaCF4qghZ22ESb4Z3n6BHNEZo4T.jpg', '{\"thumbnail\":\"candidate-images\\/17\\/thumbnail\\/20260408181211-8d1551d413f4.webp\",\"medium\":\"candidate-images\\/17\\/medium\\/20260408181211-560d9daa603f.webp\",\"large\":\"candidate-images\\/17\\/large\\/20260408181211-0dca5e3debdb.webp\"}', '{\"source_width\":843,\"source_height\":1080,\"mime\":\"image\\/jpeg\",\"blur_score\":25.02,\"face\":null,\"face_detection_error\":\"La detection de visage est desactivee.\",\"processed_at\":\"2026-04-08T18:12:11+00:00\"}', 'ready', NULL, NULL, 20, 'COTONOU', 'Je suis developpeuse Full stack', 'UAC', 'active', 1, NULL, '2026-03-16 10:32:13', '2026-04-08 16:12:11'),
(18, 3, 2, 'David', 'N\'DKEW', 'david-ndkew-51sd', NULL, NULL, 'Je suis developpeur web', NULL, NULL, NULL, NULL, 'idle', NULL, NULL, 22, 'KETOU', 'Je suis developpeur web', 'PARAKOU', 'active', 1, NULL, '2026-03-29 15:36:42', '2026-03-29 16:00:39'),
(20, 4, 2, 'DJOSSE', 'Gael', 'djosse-gael-skqi', 'djossegaston7@gmail.com', NULL, 'je suis fier', 'candidate-images/20/large/20260408194631-4771d0bd9c8b.webp', 'candidate-images/originals/wrFpLQet7lMtCBs2ZLtIPWDXgmbqXbY9Z1HbYhXu.jpg', '{\"thumbnail\":\"candidate-images\\/20\\/thumbnail\\/20260408194631-7d2b05170b1f.webp\",\"medium\":\"candidate-images\\/20\\/medium\\/20260408194631-8d1f41ed9428.webp\",\"large\":\"candidate-images\\/20\\/large\\/20260408194631-4771d0bd9c8b.webp\"}', '{\"source_width\":960,\"source_height\":1280,\"mime\":\"image\\/jpeg\",\"blur_score\":50.5,\"face\":null,\"face_detection_error\":\"La detection de visage est desactivee.\",\"processed_at\":\"2026-04-08T19:46:31+00:00\"}', 'ready', NULL, NULL, 22, 'CALAVI', 'je suis fier', 'UPAO', 'active', 1, NULL, '2026-04-04 23:50:40', '2026-04-08 17:46:31');

-- --------------------------------------------------------

--
-- Structure de la table `categories`
--

CREATE TABLE `categories` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `slug` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `status` enum('active','inactive') NOT NULL DEFAULT 'active',
  `position` int(10) UNSIGNED NOT NULL DEFAULT 0,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `categories`
--

INSERT INTO `categories` (`id`, `name`, `slug`, `description`, `status`, `position`, `deleted_at`, `created_at`, `updated_at`) VALUES
(1, 'Miss', 'miss', 'Categorie des femmes', 'active', 0, NULL, NULL, NULL),
(2, 'Mister', 'mister', 'Categorie des hommes', 'active', 0, NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Structure de la table `failed_jobs`
--

CREATE TABLE `failed_jobs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `uuid` varchar(255) NOT NULL,
  `connection` text NOT NULL,
  `queue` text NOT NULL,
  `payload` longtext NOT NULL,
  `exception` longtext NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Structure de la table `fraud_reports`
--

CREATE TABLE `fraud_reports` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `user_id` bigint(20) UNSIGNED DEFAULT NULL,
  `vote_id` bigint(20) UNSIGNED DEFAULT NULL,
  `ip_address` varchar(45) DEFAULT NULL,
  `score` tinyint(3) UNSIGNED NOT NULL DEFAULT 0,
  `reason` text DEFAULT NULL,
  `status` enum('pending','blocked','reviewed') NOT NULL DEFAULT 'pending',
  `signals` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`signals`)),
  `deleted_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Structure de la table `gallery_items`
--

CREATE TABLE `gallery_items` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `title` varchar(160) NOT NULL,
  `category` varchar(80) NOT NULL,
  `alt_text` varchar(180) DEFAULT NULL,
  `caption` text DEFAULT NULL,
  `image_path` varchar(255) NOT NULL,
  `image_meta` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`image_meta`)),
  `layout_span` varchar(20) NOT NULL DEFAULT 'standard',
  `sort_order` int(10) UNSIGNED NOT NULL DEFAULT 0,
  `is_published` tinyint(1) NOT NULL DEFAULT 1,
  `published_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `gallery_items`
--

INSERT INTO `gallery_items` (`id`, `title`, `category`, `alt_text`, `caption`, `image_path`, `image_meta`, `layout_span`, `sort_order`, `is_published`, `published_at`, `created_at`, `updated_at`) VALUES
(1, 'Soirée gala', 'Cérémonie', 'Soirée gala', NULL, 'gallery/photos/fRHsWRk7WMvKoZ1Sfxpe9ZgDUJlp6HTNjhNtUTBp.png', '{\"width\":1536,\"height\":1024,\"size\":2358389,\"mime\":\"image\\/png\",\"original_name\":\"Miss & Mister University B\\u00e9nin \\u00e9l\\u00e9gant.png\"}', 'wide', 1, 1, '2026-04-08 21:39:45', '2026-04-08 20:47:05', '2026-04-08 21:39:45'),
(2, 'CANDIDATE', 'Candidats', 'CANDIDATE', NULL, 'gallery/photos/P7kymgvbL6oeOMoyETxAa1MPnNuzbyeIcYwngTUq.jpg', '{\"width\":832,\"height\":1248,\"size\":107340,\"mime\":\"image\\/jpeg\",\"original_name\":\"WhatsApp Image 2026-04-05 at 21.42.00 (1).jpeg\"}', 'tall', 4, 0, NULL, '2026-04-08 21:38:08', '2026-04-08 21:44:16'),
(3, 'Soirée', 'Gala', 'Soirée', NULL, 'gallery/photos/5vtECX5AF1jJWNAjDRKD9EB196iNUhPBmZmM4ZXr.png', '{\"width\":1536,\"height\":1024,\"size\":2294924,\"mime\":\"image\\/png\",\"original_name\":\"Miss & Mister University B\\u00e9nin 2023.png\"}', 'wide', 2, 1, '2026-04-08 21:41:45', '2026-04-08 21:41:45', '2026-04-08 21:41:45');

-- --------------------------------------------------------

--
-- Structure de la table `ip_logs`
--

CREATE TABLE `ip_logs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `user_id` bigint(20) UNSIGNED DEFAULT NULL,
  `ip_address` varchar(45) NOT NULL,
  `action` varchar(255) NOT NULL,
  `meta` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`meta`)),
  `status` enum('active','inactive') NOT NULL DEFAULT 'active',
  `deleted_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Structure de la table `jobs`
--

CREATE TABLE `jobs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `queue` varchar(255) NOT NULL,
  `payload` longtext NOT NULL,
  `attempts` tinyint(3) UNSIGNED NOT NULL,
  `reserved_at` int(10) UNSIGNED DEFAULT NULL,
  `available_at` int(10) UNSIGNED NOT NULL,
  `created_at` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Structure de la table `job_batches`
--

CREATE TABLE `job_batches` (
  `id` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `total_jobs` int(11) NOT NULL,
  `pending_jobs` int(11) NOT NULL,
  `failed_jobs` int(11) NOT NULL,
  `failed_job_ids` longtext NOT NULL,
  `options` mediumtext DEFAULT NULL,
  `cancelled_at` int(11) DEFAULT NULL,
  `created_at` int(11) NOT NULL,
  `finished_at` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Structure de la table `migrations`
--

CREATE TABLE `migrations` (
  `id` int(10) UNSIGNED NOT NULL,
  `migration` varchar(255) NOT NULL,
  `batch` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(1, '0001_01_01_000000_create_users_table', 1),
(2, '0001_01_01_000001_create_cache_table', 1),
(3, '0001_01_01_000002_create_jobs_table', 1),
(4, '2026_03_14_110719_create_personal_access_tokens_table', 1),
(5, '2026_03_14_110723_create_admins_table', 1),
(6, '2026_03_14_110727_create_categories_table', 1),
(7, '2026_03_14_110731_create_candidates_table', 1),
(8, '2026_03_14_110805_create_activity_logs_table', 2),
(9, '2026_03_14_180000_add_must_change_password_to_users_table', 3),
(10, '2026_03_15_000001_add_video_path_to_candidates_table', 4),
(11, '2026_03_15_001000_add_city_description_is_active_to_candidates_table', 5),
(12, '2026_03_14_110735_create_votes_table', 6),
(13, '2026_03_14_110739_create_payments_table', 6),
(14, '2026_03_14_110743_create_transactions_table', 6),
(15, '2026_03_14_110747_create_results_table', 6),
(16, '2026_03_14_110750_create_notifications_table', 6),
(17, '2026_03_14_110754_create_settings_table', 6),
(18, '2026_03_14_110758_create_ip_logs_table', 6),
(19, '2026_03_14_110801_create_fraud_reports_table', 6),
(20, '2026_03_15_120000_create_sessions_table', 7),
(21, '2026_03_29_200000_update_vote_status_enum', 8),
(22, '2026_03_30_000100_add_quantity_to_votes_table', 9),
(23, '2026_03_30_130000_add_quantity_to_votes_table_if_missing', 10),
(24, '2026_03_30_140000_add_public_number_to_candidates_table', 11),
(25, '2026_04_04_120000_add_status_role_phone_softdeletes_to_users_table', 12),
(26, '2026_04_05_120000_add_candidate_id_to_users_table', 13),
(27, '2026_04_08_120000_add_candidate_image_pipeline_fields_to_candidates_table', 14),
(28, '2026_04_08_190000_create_gallery_items_table', 15);

-- --------------------------------------------------------

--
-- Structure de la table `notifications`
--

CREATE TABLE `notifications` (
  `id` char(36) NOT NULL,
  `notifiable_type` varchar(255) DEFAULT NULL,
  `notifiable_id` bigint(20) UNSIGNED DEFAULT NULL,
  `type` varchar(255) NOT NULL,
  `title` varchar(255) NOT NULL,
  `body` text DEFAULT NULL,
  `data` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`data`)),
  `read_at` timestamp NULL DEFAULT NULL,
  `status` enum('active','inactive') NOT NULL DEFAULT 'active',
  `deleted_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Structure de la table `password_reset_tokens`
--

CREATE TABLE `password_reset_tokens` (
  `email` varchar(255) NOT NULL,
  `token` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Structure de la table `payments`
--

CREATE TABLE `payments` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `user_id` bigint(20) UNSIGNED DEFAULT NULL,
  `provider` varchar(255) NOT NULL DEFAULT 'kkiapay',
  `reference` varchar(255) NOT NULL,
  `transaction_id` varchar(255) DEFAULT NULL,
  `amount` decimal(12,2) NOT NULL,
  `currency` varchar(8) NOT NULL DEFAULT 'XOF',
  `status` enum('initiated','processing','succeeded','failed','refunded') NOT NULL DEFAULT 'initiated',
  `payload` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`payload`)),
  `meta` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`meta`)),
  `paid_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `payments`
--

INSERT INTO `payments` (`id`, `user_id`, `provider`, `reference`, `transaction_id`, `amount`, `currency`, `status`, `payload`, `meta`, `paid_at`, `deleted_at`, `created_at`, `updated_at`) VALUES
(1, 1, 'kkiapay', '', 'H001172774276GUSJIUUI', 500.00, 'XOF', 'succeeded', NULL, NULL, '2026-03-29 18:20:48', NULL, NULL, NULL),
(2, NULL, 'kkiapay', 'KUJOVD2TABDG', NULL, 100.00, 'XOF', 'initiated', NULL, '{\"payment_url\":\"http:\\/\\/localhost:8000\\/payments\\/KUJOVD2TABDG\",\"meta\":{\"user_agent\":\"Mozilla\\/5.0 (X11; Linux x86_64) AppleWebKit\\/537.36 (KHTML, like Gecko) Chrome\\/146.0.0.0 Safari\\/537.36\",\"quantity\":1,\"ip\":\"127.0.0.1\"}}', NULL, NULL, '2026-04-04 12:54:55', '2026-04-04 12:54:55'),
(3, NULL, 'kkiapay', 'YZXKJYQOOW3Q', NULL, 200.00, 'XOF', 'initiated', NULL, '{\"payment_url\":\"http:\\/\\/localhost:8000\\/payments\\/YZXKJYQOOW3Q\",\"meta\":{\"user_agent\":\"Mozilla\\/5.0 (X11; Linux x86_64) AppleWebKit\\/537.36 (KHTML, like Gecko) Chrome\\/146.0.0.0 Safari\\/537.36\",\"quantity\":2,\"ip\":\"127.0.0.1\"}}', NULL, NULL, '2026-04-04 12:55:24', '2026-04-04 12:55:24');

-- --------------------------------------------------------

--
-- Structure de la table `personal_access_tokens`
--

CREATE TABLE `personal_access_tokens` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `tokenable_type` varchar(255) NOT NULL,
  `tokenable_id` bigint(20) UNSIGNED NOT NULL,
  `name` text NOT NULL,
  `token` varchar(64) NOT NULL,
  `abilities` text DEFAULT NULL,
  `last_used_at` timestamp NULL DEFAULT NULL,
  `expires_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `personal_access_tokens`
--

INSERT INTO `personal_access_tokens` (`id`, `tokenable_type`, `tokenable_id`, `name`, `token`, `abilities`, `last_used_at`, `expires_at`, `created_at`, `updated_at`) VALUES
(2, 'App\\Models\\Admin', 1, 'admin_token', 'fc736c111fb8c97257950f79054c0e221359b1c4d2d57ea4fbbdc2153db026e4', '[\"admin\"]', '2026-03-14 17:16:20', NULL, '2026-03-14 17:16:18', '2026-03-14 17:16:20'),
(3, 'App\\Models\\Admin', 1, 'admin_token', 'fc75c8ed6e50ebd29d3f4c0752dc2519a1238e7d5f86af23f5110ac04a6f089a', '[\"admin\",\"superadmin\"]', '2026-03-14 17:29:26', NULL, '2026-03-14 17:28:55', '2026-03-14 17:29:26'),
(4, 'App\\Models\\Admin', 1, 'admin_token', '4b5aff36552866f0c002679e468e1e96020ac987a7910f337d8be0c0cecf0279', '[\"admin\",\"superadmin\"]', '2026-03-14 17:37:13', NULL, '2026-03-14 17:29:28', '2026-03-14 17:37:13'),
(5, 'App\\Models\\Admin', 1, 'admin_token', '17c7e47cc59f4c144132d76c9f6c18a6f9c0d3984b1c8a68ceb8248ae45eada0', '[\"admin\",\"superadmin\"]', '2026-03-14 17:43:43', NULL, '2026-03-14 17:37:16', '2026-03-14 17:43:43'),
(6, 'App\\Models\\Admin', 1, 'admin_token', '4c2aa1a254d3b426e6a59406187e15d619a1bd0c3a6a26b1788b09dc3ee461a8', '[\"admin\",\"superadmin\"]', '2026-03-14 17:58:55', NULL, '2026-03-14 17:43:46', '2026-03-14 17:58:55'),
(7, 'App\\Models\\Admin', 1, 'admin_token', 'da7cd5a31c8cce723c794f700d4a154e2699e9357b007c28aa6641b7ac6cf808', '[\"admin\",\"superadmin\"]', '2026-03-14 18:08:48', NULL, '2026-03-14 18:08:46', '2026-03-14 18:08:48'),
(8, 'App\\Models\\Admin', 1, 'admin_token', '769f96b62c5a0c0d04767529ee788616c18a87db09cc750ef7d73ed6192942c6', '[\"admin\",\"superadmin\"]', '2026-03-14 18:09:25', NULL, '2026-03-14 18:08:58', '2026-03-14 18:09:25'),
(10, 'App\\Models\\Admin', 1, 'admin_token', '9e28e19d1c337a0428b4013bcda49ae00f9cc6a526de484d4ce33090981e9516', '[\"admin\",\"superadmin\"]', '2026-03-14 18:37:40', NULL, '2026-03-14 18:34:28', '2026-03-14 18:37:40'),
(11, 'App\\Models\\Admin', 1, 'admin_token', '44a64bdbc452fe7e301b8b84e241b9591934b5dd352ad85ed929f384a6ecc4c8', '[\"admin\",\"superadmin\"]', '2026-03-14 20:12:57', NULL, '2026-03-14 18:52:23', '2026-03-14 20:12:57'),
(12, 'App\\Models\\Admin', 1, 'admin_token', 'f72207d558d964895904005048643403937c84c922801bf4fefdd9c001c21ea3', '[\"admin\",\"superadmin\"]', '2026-03-14 20:27:30', NULL, '2026-03-14 20:13:07', '2026-03-14 20:27:30'),
(13, 'App\\Models\\Admin', 1, 'admin_token', '1cfef590b0ad663f720c509aa6e77ba3d399dab117c9b2943192a6fcc74e38ef', '[\"admin\",\"superadmin\"]', '2026-03-14 21:57:46', NULL, '2026-03-14 21:54:39', '2026-03-14 21:57:46'),
(14, 'App\\Models\\Admin', 1, 'admin_token', '07219d7fe012c2718f06f96ceeda0601308435d57ae64d28474870db19bc7da7', '[\"admin\",\"superadmin\"]', '2026-03-15 10:23:51', NULL, '2026-03-15 08:24:39', '2026-03-15 10:23:51'),
(15, 'App\\Models\\Admin', 1, 'admin_token', '1208862df51089e024dadae79ff16b70efc64f4b60e5249a978e0c85ff75fe98', '[\"admin\",\"superadmin\"]', '2026-03-15 11:18:33', NULL, '2026-03-15 10:26:09', '2026-03-15 11:18:33'),
(16, 'App\\Models\\Admin', 1, 'admin_token', 'b5b62e5884b05880366fe33d53346d111f6b70dba1ebcfcd8738565b518b64b4', '[\"admin\",\"superadmin\"]', '2026-03-15 15:16:03', NULL, '2026-03-15 13:41:05', '2026-03-15 15:16:03'),
(17, 'App\\Models\\Admin', 3, 'admin_token', '9e1868ec825a63eb39dcc6f482c0fbc36bc11d33e132b81f6eff8c03e0c413f7', '[\"admin\",\"superadmin\"]', '2026-03-16 09:17:11', NULL, '2026-03-16 09:16:04', '2026-03-16 09:17:11'),
(18, 'App\\Models\\Admin', 3, 'admin_token', '2b66d9405802edcb4ccf57aac163dd5f2bd31236526f8cc7c5fa3b8ceb18409d', '[\"admin\",\"superadmin\"]', '2026-03-16 09:21:19', NULL, '2026-03-16 09:17:28', '2026-03-16 09:21:19'),
(19, 'App\\Models\\Admin', 3, 'admin_token', '410c949710283ce443f99f63c56678f29a268e5ae245be0085bc369b75e24e2a', '[\"admin\",\"superadmin\"]', '2026-03-16 11:17:13', NULL, '2026-03-16 09:23:10', '2026-03-16 11:17:13'),
(20, 'App\\Models\\Admin', 3, 'admin_token', '44b6f98c79d9f9d1ef6bbe7a5650e795e393b8240d24fb33ec283b49ff8962e0', '[\"admin\",\"superadmin\"]', '2026-03-16 09:38:25', NULL, '2026-03-16 09:38:16', '2026-03-16 09:38:25'),
(21, 'App\\Models\\Admin', 3, 'admin_token', '7f28905bbb8a3450fea1cfe2c814cb95c89400c3eecf08c335676568b2d79899', '[\"admin\",\"superadmin\"]', '2026-03-16 10:17:43', NULL, '2026-03-16 10:17:16', '2026-03-16 10:17:43'),
(22, 'App\\Models\\Admin', 3, 'admin_token', '1d4701ba2dde50a58e2804582f505d2c2a6cc4f0e16c1465ba31d31012d69979', '[\"admin\",\"superadmin\"]', '2026-03-16 10:50:00', NULL, '2026-03-16 10:17:49', '2026-03-16 10:50:00'),
(23, 'App\\Models\\Admin', 3, 'admin_token', 'fe20d66dc18cacd143c002421302cdd405b1849ae21f6f588e582f748b9ba7c3', '[\"admin\",\"superadmin\"]', '2026-03-16 16:34:56', NULL, '2026-03-16 15:27:07', '2026-03-16 16:34:56'),
(24, 'App\\Models\\Admin', 3, 'admin_token', 'c15b6da8070a3c8fe70633ae2a39718f1115076cb6829bb950e5c90f0b26cb68', '[\"admin\",\"superadmin\"]', '2026-03-29 14:41:39', NULL, '2026-03-29 14:41:38', '2026-03-29 14:41:39'),
(25, 'App\\Models\\Admin', 3, 'admin_token', 'fc679375515431210318ca45cb8f948b78f2009cf5e4a99f2045de694172fd86', '[\"admin\",\"superadmin\"]', '2026-03-29 14:41:52', NULL, '2026-03-29 14:41:52', '2026-03-29 14:41:52'),
(26, 'App\\Models\\Admin', 3, 'admin_token', '3f42d9a1919bc6876a1dd7623ecbf4af94fcc45e8f8ef80fc2e8a8225860dd66', '[\"admin\",\"superadmin\"]', '2026-03-29 14:45:03', NULL, '2026-03-29 14:45:03', '2026-03-29 14:45:03'),
(27, 'App\\Models\\Admin', 3, 'admin_token', '1ac11d74c68d1c191c4c3e59af9f927e53ac9c3d5194aa1c7aee00c4dbb3d747', '[\"admin\",\"superadmin\"]', '2026-03-29 15:16:26', NULL, '2026-03-29 14:45:42', '2026-03-29 15:16:26'),
(28, 'App\\Models\\Admin', 3, 'admin_token', '10cf0cda191f4d06cdb52cf6d5d6d41e7df3e106962f7e7b6261d322276b83c6', '[\"admin\",\"superadmin\"]', '2026-03-29 17:17:01', NULL, '2026-03-29 15:17:10', '2026-03-29 17:17:01'),
(29, 'App\\Models\\Admin', 3, 'admin_token', 'c33c7d882e4e2a1a3407d7ad9f155bf28ed5b9e27ad513bac8b335614d0206bd', '[\"admin\",\"superadmin\"]', '2026-03-30 11:03:21', NULL, '2026-03-30 09:33:52', '2026-03-30 11:03:21'),
(30, 'App\\Models\\Admin', 3, 'admin_token', 'b5b8bd688fd14697bcced68f2f2ba7b2ff7a70218713809d89b96e87d3bea40f', '[\"admin\",\"superadmin\"]', '2026-03-30 12:33:33', NULL, '2026-03-30 11:38:33', '2026-03-30 12:33:33'),
(31, 'App\\Models\\Admin', 3, 'admin_token', 'c0d46b704b712f8c82eaf31e30f26847b444d7884475deb5a66f1857611b4723', '[\"admin\",\"superadmin\"]', '2026-04-04 13:23:23', NULL, '2026-04-04 11:24:13', '2026-04-04 13:23:23'),
(32, 'App\\Models\\Admin', 3, 'admin_token', '40bf7cbc852c012576426b63c95c95bd3703a389b85eeb5570d9fd098558776a', '[\"admin\",\"superadmin\"]', '2026-04-04 15:39:26', NULL, '2026-04-04 13:55:10', '2026-04-04 15:39:26'),
(33, 'App\\Models\\Admin', 3, 'admin_token', '25128ba6ec601dc4ca9332e17b9da3b1e9c68d2b77e52a553fb9a55a43510667', '[\"admin\",\"superadmin\"]', '2026-04-04 16:42:13', NULL, '2026-04-04 16:06:19', '2026-04-04 16:42:13'),
(34, 'App\\Models\\Admin', 3, 'admin_token', 'bb3ed62318dc3dc8f711edcc008660d6a9aeafb103c099bf9b56b3b45199cf36', '[\"admin\",\"superadmin\"]', '2026-04-04 16:59:27', NULL, '2026-04-04 16:42:32', '2026-04-04 16:59:27'),
(35, 'App\\Models\\Admin', 3, 'admin_token', '6740f3e64ee18cabb47f10095bfc9088181265d583699c36758e21f151f2d6fc', '[\"admin\",\"superadmin\"]', '2026-04-04 20:19:04', NULL, '2026-04-04 18:52:40', '2026-04-04 20:19:04'),
(36, 'App\\Models\\Admin', 3, 'admin_token', 'e979b607d150e83667d0088660bf04369c0f2e43bd3e9f87c1a9ea94ef2a747e', '[\"admin\",\"superadmin\"]', '2026-04-04 20:39:03', NULL, '2026-04-04 20:38:55', '2026-04-04 20:39:03'),
(37, 'App\\Models\\Admin', 3, 'admin_token', 'fc1078d6fd36ad0462dede00172fcf959853febe98573ba060edebf0861a14b2', '[\"admin\",\"superadmin\"]', '2026-04-04 20:54:07', NULL, '2026-04-04 20:49:31', '2026-04-04 20:54:07'),
(39, 'App\\Models\\Admin', 3, 'admin_token', '9a7fcfcfcc67bca60fa4173c9a0be3e012278ac2c7e7c80a94198dea444ea408', '[\"admin\",\"superadmin\"]', '2026-04-04 21:14:52', NULL, '2026-04-04 21:11:08', '2026-04-04 21:14:52'),
(40, 'App\\Models\\Admin', 3, 'admin_token', 'd46ae0c8445d3b698898d6b6f662d6c140947d1b06853db7a314d6e7cc016d7a', '[\"admin\",\"superadmin\"]', '2026-04-04 22:17:57', NULL, '2026-04-04 21:25:08', '2026-04-04 22:17:57'),
(43, 'App\\Models\\Admin', 3, 'admin_token', 'af75d76f6d8fda821f477bee8f8011bce1d0332b719050442facbd1f1608bb6d', '[\"admin\",\"superadmin\"]', '2026-04-05 00:16:04', NULL, '2026-04-05 00:16:04', '2026-04-05 00:16:04'),
(49, 'App\\Models\\User', 7, 'auth_token', '7ca00b9c4c2f86fdfed196911224eaabf9d216b65a2493cb8eea771542ac9069', '[\"user\"]', NULL, NULL, '2026-04-05 20:25:33', '2026-04-05 20:25:33'),
(52, 'App\\Models\\Admin', 3, 'admin_token', '1bb0dd25803d3be78b176a8e99e555fcb34d2d80f2ddad395c2e2211b0ce04ac', '[\"admin\",\"superadmin\"]', '2026-04-05 22:55:08', NULL, '2026-04-05 21:09:34', '2026-04-05 22:55:08'),
(56, 'App\\Models\\Admin', 3, 'admin_token', '71df70f9ea6e3e138bd5e854403a74871c97aec7acbd9b83064882b141c5be5a', '[\"admin\",\"superadmin\"]', '2026-04-08 15:18:49', NULL, '2026-04-08 13:38:20', '2026-04-08 15:18:49'),
(57, 'App\\Models\\Admin', 3, 'admin_token', 'd75f623a6b483547459e650a0c598be0873cb66019f44ae9368aeea1b87ac447', '[\"admin\",\"superadmin\"]', '2026-04-08 16:12:11', NULL, '2026-04-08 15:51:55', '2026-04-08 16:12:11'),
(61, 'App\\Models\\Admin', 3, 'admin_token', '8fff636ef9f57d09c17a1421c02104c2672157d28c91cab2c1f634662dcc921f', '[\"admin\",\"superadmin\"]', NULL, NULL, '2026-04-08 16:49:43', '2026-04-08 16:49:43'),
(63, 'App\\Models\\Admin', 3, 'admin_token', 'cc723d00d0c82892b0857524b9ec9f0cf737cec6ec1e22c7f338400c431e8aef', '[\"admin\",\"superadmin\"]', '2026-04-08 18:09:36', NULL, '2026-04-08 17:07:08', '2026-04-08 18:09:36'),
(64, 'App\\Models\\Admin', 3, 'admin_token', '741150fc14f57016598642ba4ecf4cfa8e9bc2c818a599b09c49054e5732e917', '[\"admin\",\"superadmin\"]', '2026-04-08 21:27:48', NULL, '2026-04-08 19:28:05', '2026-04-08 21:27:48'),
(66, 'App\\Models\\Admin', 3, 'admin_token', 'f777e7e4d144943dad45ecaaf68695947901b92b745fff06317a96a40443977a', '[\"admin\",\"superadmin\"]', '2026-04-08 22:05:24', NULL, '2026-04-08 21:28:27', '2026-04-08 22:05:24'),
(68, 'App\\Models\\Admin', 3, 'admin_token', '07e6f1f140f824d3f262e1dc2c5c997c0c65a6d6900cb84db0e04cd95893f4d5', '[\"admin\",\"superadmin\"]', '2026-04-09 05:26:41', NULL, '2026-04-09 03:53:41', '2026-04-09 05:26:41');

-- --------------------------------------------------------

--
-- Structure de la table `results`
--

CREATE TABLE `results` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `category_id` bigint(20) UNSIGNED DEFAULT NULL,
  `candidate_id` bigint(20) UNSIGNED NOT NULL,
  `total_votes` bigint(20) UNSIGNED NOT NULL DEFAULT 0,
  `total_amount` decimal(12,2) NOT NULL DEFAULT 0.00,
  `status` enum('draft','published') NOT NULL DEFAULT 'draft',
  `deleted_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Structure de la table `sessions`
--

CREATE TABLE `sessions` (
  `id` varchar(255) NOT NULL,
  `user_id` bigint(20) UNSIGNED DEFAULT NULL,
  `ip_address` varchar(45) DEFAULT NULL,
  `user_agent` text DEFAULT NULL,
  `payload` longtext NOT NULL,
  `last_activity` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `sessions`
--

INSERT INTO `sessions` (`id`, `user_id`, `ip_address`, `user_agent`, `payload`, `last_activity`) VALUES
('hq5wm8LzeiE3H8lfgq14hLo9DEIxhkGURcJv1lmY', NULL, '127.0.0.1', 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiUnhEZGR6TWtRSkluOTdaRTV6ODRyRVFtQVFvQlN1eTB3N2I4cUdHTyI7czo5OiJfcHJldmlvdXMiO2E6Mjp7czozOiJ1cmwiO3M6NDM6Imh0dHA6Ly9sb2NhbGhvc3Q6ODAwMC9hcGkvcHVibGljL2NhbmRpZGF0ZXMiO3M6NToicm91dGUiO047fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1773682504),
('OhNHqkQD7ys4ySBfdl2HRBc1hZEE2C2LsXnKk55q', NULL, '127.0.0.1', 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiSEhnTzBDQ3NOZzI0b21oVTRURnBEZnFDd05mejRjWkJGeVlSY1ZJbSI7czo5OiJfcHJldmlvdXMiO2E6Mjp7czozOiJ1cmwiO3M6MjE6Imh0dHA6Ly8xMjcuMC4wLjE6ODAwMCI7czo1OiJyb3V0ZSI7Tjt9czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1774780239),
('ZxI3kQVqaXRqCYKrzL3VL6d10DoW2c4PL264cokL', NULL, '127.0.0.1', 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiZkNmM2tDM2NPcHJDd0xvOEZ5dmk5MHVxTkIzcnBWSXU5V1hheTdEdiI7czo5OiJfcHJldmlvdXMiO2E6Mjp7czozOiJ1cmwiO3M6MjE6Imh0dHA6Ly8xMjcuMC4wLjE6ODAwMCI7czo1OiJyb3V0ZSI7Tjt9czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1773677095);

-- --------------------------------------------------------

--
-- Structure de la table `settings`
--

CREATE TABLE `settings` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `key` varchar(255) NOT NULL,
  `value` text DEFAULT NULL,
  `group` varchar(255) NOT NULL DEFAULT 'general',
  `status` enum('active','inactive') NOT NULL DEFAULT 'active',
  `deleted_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `settings`
--

INSERT INTO `settings` (`id`, `key`, `value`, `group`, `status`, `deleted_at`, `created_at`, `updated_at`) VALUES
(1, 'price_per_vote', '100', 'rules', 'active', NULL, '2026-04-04 12:21:55', '2026-04-04 22:17:57'),
(2, 'currency', 'XOF', 'payments', 'active', NULL, '2026-04-04 12:21:55', '2026-04-04 12:21:55'),
(3, 'max_votes_per_day', '200', 'rules', 'active', NULL, '2026-04-04 12:21:55', '2026-04-04 12:48:14'),
(4, 'vote_start_at', '2026-04-09', 'dates', 'active', NULL, '2026-04-04 12:21:55', '2026-04-08 22:02:51'),
(5, 'vote_end_at', '2026-04-10', 'dates', 'active', NULL, '2026-04-04 12:21:55', '2026-04-08 22:02:51'),
(6, 'voting_open', '1', 'features', 'active', NULL, '2026-04-04 12:21:55', '2026-04-04 21:32:23'),
(7, 'gallery_public', '1', 'features', 'active', NULL, '2026-04-04 12:21:55', '2026-04-04 21:32:23'),
(8, 'results_public', '0', 'features', 'active', NULL, '2026-04-04 12:21:55', '2026-04-04 21:32:23'),
(9, 'email_confirm', '1', 'features', 'active', NULL, '2026-04-04 12:21:55', '2026-04-04 12:48:14'),
(10, 'sms_confirm', '0', 'features', 'active', NULL, '2026-04-04 12:21:55', '2026-04-04 12:48:14'),
(11, 'captcha_enabled', '1', 'features', 'active', NULL, '2026-04-04 12:21:55', '2026-04-04 12:48:14'),
(12, 'ip_tracking_enabled', '1', 'features', 'active', NULL, '2026-04-04 12:21:55', '2026-04-04 12:48:14'),
(13, 'maintenance_mode', '0', 'features', 'active', NULL, '2026-04-04 12:21:55', '2026-04-05 17:50:12'),
(14, 'countdown_pause_started_at', NULL, 'runtime', 'active', NULL, '2026-04-04 16:42:13', '2026-04-05 17:50:12'),
(15, 'countdown_paused_seconds', '4437', 'runtime', 'active', NULL, '2026-04-04 16:42:13', '2026-04-05 17:50:12'),
(16, 'maintenance_end_at', '2026-04-05T20:55', 'dates', 'active', NULL, '2026-04-04 16:55:48', '2026-04-04 20:19:04');

-- --------------------------------------------------------

--
-- Structure de la table `transactions`
--

CREATE TABLE `transactions` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `payment_id` bigint(20) UNSIGNED NOT NULL,
  `type` enum('debit','credit') NOT NULL DEFAULT 'debit',
  `status` enum('pending','succeeded','failed') NOT NULL DEFAULT 'pending',
  `amount` decimal(12,2) NOT NULL,
  `currency` varchar(8) NOT NULL DEFAULT 'XOF',
  `provider_reference` varchar(255) DEFAULT NULL,
  `payload` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`payload`)),
  `deleted_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `transactions`
--

INSERT INTO `transactions` (`id`, `payment_id`, `type`, `status`, `amount`, `currency`, `provider_reference`, `payload`, `deleted_at`, `created_at`, `updated_at`) VALUES
(1, 1, 'debit', 'succeeded', 500.00, 'XOF', 'H19928698163hgibhbhjks', NULL, NULL, '2026-03-29 18:22:51', NULL);

-- --------------------------------------------------------

--
-- Structure de la table `users`
--

CREATE TABLE `users` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `candidate_id` bigint(20) UNSIGNED DEFAULT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `role` enum('admin','candidate','user') NOT NULL DEFAULT 'user',
  `status` enum('active','inactive') NOT NULL DEFAULT 'active',
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `must_change_password` tinyint(1) NOT NULL DEFAULT 1,
  `avatar_path` varchar(255) DEFAULT NULL,
  `remember_token` varchar(100) DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `users`
--

INSERT INTO `users` (`id`, `candidate_id`, `name`, `email`, `phone`, `role`, `status`, `email_verified_at`, `password`, `must_change_password`, `avatar_path`, `remember_token`, `deleted_at`, `created_at`, `updated_at`) VALUES
(1, NULL, 'Test User', 'user@example.com', '0700000000', 'user', 'active', NULL, '$2y$12$VokAi3dGFY3V1Jp9sWbdOesnvrXfm2h4/fyWkvI5AaAjAwTH8mmGa', 1, NULL, NULL, NULL, '2026-03-14 17:03:08', '2026-04-04 16:06:44'),
(3, NULL, 'Test User', 'test@example.com', '0000000000', 'user', 'inactive', '2026-04-04 12:21:54', '$2y$12$E6zG8G3CNSE9Wqa.imED6e2oqCnuRypKzia2Yi0bCoXVPAb.8L5Ci', 0, NULL, 'jKoFpMDjCh', NULL, '2026-04-04 12:21:54', '2026-04-04 14:38:22'),
(6, 20, 'DJOSSE Gael', 'djossegaston7@gmail.com', NULL, 'candidate', 'active', NULL, '$2y$12$2IiMJ29PUnhbpmqyjytIT.k1WiMt/zm78Khz7eEFF.F1EOdVy0CIe', 1, NULL, NULL, NULL, '2026-04-04 23:50:40', '2026-04-04 23:50:40'),
(7, NULL, 'ADECHINA Gaston', 'gastonadechina@gmail.com', '68552584', 'user', 'active', NULL, '$2y$12$y/oYFf/IJ5oOwzkG.G1LZ.Ny6Xu0cw5BaMszu9CJmGDlexa6p5xV6', 0, NULL, NULL, NULL, '2026-04-05 20:24:37', '2026-04-05 20:24:37'),
(8, 17, 'Ines GANDAHO', 'inesgandaho7@gmail.com', NULL, 'candidate', 'active', NULL, '$2y$12$Xdn0ReN7K7HdBtZdSHebwuBfdVwHF1b1jWZJAp8CGqAb1UiCt26CO', 0, NULL, NULL, NULL, '2026-04-08 15:59:30', '2026-04-08 16:46:46'),
(9, 16, 'ADE CHINA', 'ade@gmail.com', NULL, 'candidate', 'active', NULL, '$2y$12$w1L2hjSnO67tfj3TTYWUMu8nTpGoKfmoLcsWOyq6rvvhgq5vtcQ.C', 1, NULL, NULL, NULL, '2026-04-08 18:09:36', '2026-04-08 18:09:36');

-- --------------------------------------------------------

--
-- Structure de la table `votes`
--

CREATE TABLE `votes` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `user_id` bigint(20) UNSIGNED DEFAULT NULL,
  `candidate_id` bigint(20) UNSIGNED NOT NULL,
  `payment_id` bigint(20) UNSIGNED DEFAULT NULL,
  `amount` decimal(12,2) NOT NULL DEFAULT 0.00,
  `quantity` int(10) UNSIGNED NOT NULL DEFAULT 1,
  `currency` varchar(8) NOT NULL DEFAULT 'XOF',
  `status` enum('pending','confirmed','failed','suspect','cancelled') DEFAULT 'pending',
  `ip_address` varchar(45) DEFAULT NULL,
  `meta` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`meta`)),
  `deleted_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `votes`
--

INSERT INTO `votes` (`id`, `user_id`, `candidate_id`, `payment_id`, `amount`, `quantity`, `currency`, `status`, `ip_address`, `meta`, `deleted_at`, `created_at`, `updated_at`) VALUES
(1, 1, 17, 1, 500.00, 5, 'XOF', 'confirmed', 'LAKJFEILHUIRHFUIRU', NULL, NULL, '2026-03-29 18:31:00', '2026-04-04 11:39:28'),
(2, NULL, 16, 2, 100.00, 1, 'XOF', 'confirmed', '127.0.0.1', '{\"user_agent\":\"Mozilla\\/5.0 (X11; Linux x86_64) AppleWebKit\\/537.36 (KHTML, like Gecko) Chrome\\/146.0.0.0 Safari\\/537.36\",\"quantity\":1}', NULL, '2026-04-04 12:54:55', '2026-04-08 13:39:12'),
(3, NULL, 16, 3, 200.00, 2, 'XOF', 'cancelled', '127.0.0.1', '{\"user_agent\":\"Mozilla\\/5.0 (X11; Linux x86_64) AppleWebKit\\/537.36 (KHTML, like Gecko) Chrome\\/146.0.0.0 Safari\\/537.36\",\"quantity\":2}', NULL, '2026-04-04 12:55:24', '2026-04-04 21:13:37');

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `activity_logs`
--
ALTER TABLE `activity_logs`
  ADD PRIMARY KEY (`id`),
  ADD KEY `activity_logs_causer_type_causer_id_index` (`causer_type`,`causer_id`),
  ADD KEY `activity_logs_subject_type_subject_id_index` (`subject_type`,`subject_id`),
  ADD KEY `activity_logs_action_index` (`action`),
  ADD KEY `activity_logs_status_index` (`status`);

--
-- Index pour la table `admins`
--
ALTER TABLE `admins`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `admins_email_unique` (`email`),
  ADD UNIQUE KEY `admins_phone_unique` (`phone`),
  ADD KEY `admins_status_index` (`status`);

--
-- Index pour la table `cache`
--
ALTER TABLE `cache`
  ADD PRIMARY KEY (`key`),
  ADD KEY `cache_expiration_index` (`expiration`);

--
-- Index pour la table `cache_locks`
--
ALTER TABLE `cache_locks`
  ADD PRIMARY KEY (`key`),
  ADD KEY `cache_locks_expiration_index` (`expiration`);

--
-- Index pour la table `candidates`
--
ALTER TABLE `candidates`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `candidates_slug_unique` (`slug`),
  ADD UNIQUE KEY `candidates_email_unique` (`email`),
  ADD UNIQUE KEY `candidates_phone_unique` (`phone`),
  ADD UNIQUE KEY `candidates_public_number_unique` (`public_number`),
  ADD KEY `candidates_category_id_foreign` (`category_id`),
  ADD KEY `candidates_status_index` (`status`),
  ADD KEY `candidates_is_active_index` (`is_active`);

--
-- Index pour la table `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `categories_name_unique` (`name`),
  ADD UNIQUE KEY `categories_slug_unique` (`slug`),
  ADD KEY `categories_status_index` (`status`);

--
-- Index pour la table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`);

--
-- Index pour la table `fraud_reports`
--
ALTER TABLE `fraud_reports`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fraud_reports_user_id_foreign` (`user_id`),
  ADD KEY `fraud_reports_vote_id_foreign` (`vote_id`),
  ADD KEY `fraud_reports_score_index` (`score`),
  ADD KEY `fraud_reports_status_index` (`status`);

--
-- Index pour la table `gallery_items`
--
ALTER TABLE `gallery_items`
  ADD PRIMARY KEY (`id`),
  ADD KEY `gallery_items_category_index` (`category`),
  ADD KEY `gallery_items_sort_order_index` (`sort_order`),
  ADD KEY `gallery_items_is_published_index` (`is_published`),
  ADD KEY `gallery_items_published_at_index` (`published_at`);

--
-- Index pour la table `ip_logs`
--
ALTER TABLE `ip_logs`
  ADD PRIMARY KEY (`id`),
  ADD KEY `ip_logs_user_id_foreign` (`user_id`),
  ADD KEY `ip_logs_ip_address_index` (`ip_address`),
  ADD KEY `ip_logs_action_index` (`action`),
  ADD KEY `ip_logs_status_index` (`status`);

--
-- Index pour la table `jobs`
--
ALTER TABLE `jobs`
  ADD PRIMARY KEY (`id`),
  ADD KEY `jobs_queue_reserved_at_available_at_index` (`queue`,`reserved_at`,`available_at`);

--
-- Index pour la table `job_batches`
--
ALTER TABLE `job_batches`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `notifications`
--
ALTER TABLE `notifications`
  ADD PRIMARY KEY (`id`),
  ADD KEY `notifications_notifiable_type_notifiable_id_index` (`notifiable_type`,`notifiable_id`),
  ADD KEY `notifications_type_index` (`type`),
  ADD KEY `notifications_status_index` (`status`);

--
-- Index pour la table `password_reset_tokens`
--
ALTER TABLE `password_reset_tokens`
  ADD PRIMARY KEY (`email`);

--
-- Index pour la table `payments`
--
ALTER TABLE `payments`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `payments_reference_unique` (`reference`),
  ADD UNIQUE KEY `payments_transaction_id_unique` (`transaction_id`),
  ADD KEY `payments_user_id_foreign` (`user_id`),
  ADD KEY `payments_status_index` (`status`);

--
-- Index pour la table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `personal_access_tokens_token_unique` (`token`),
  ADD KEY `personal_access_tokens_tokenable_type_tokenable_id_index` (`tokenable_type`,`tokenable_id`),
  ADD KEY `personal_access_tokens_expires_at_index` (`expires_at`);

--
-- Index pour la table `results`
--
ALTER TABLE `results`
  ADD PRIMARY KEY (`id`),
  ADD KEY `results_category_id_foreign` (`category_id`),
  ADD KEY `results_candidate_id_foreign` (`candidate_id`),
  ADD KEY `results_status_index` (`status`);

--
-- Index pour la table `sessions`
--
ALTER TABLE `sessions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `sessions_user_id_index` (`user_id`),
  ADD KEY `sessions_last_activity_index` (`last_activity`);

--
-- Index pour la table `settings`
--
ALTER TABLE `settings`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `settings_key_unique` (`key`),
  ADD KEY `settings_group_index` (`group`),
  ADD KEY `settings_status_index` (`status`);

--
-- Index pour la table `transactions`
--
ALTER TABLE `transactions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `transactions_payment_id_foreign` (`payment_id`),
  ADD KEY `transactions_status_index` (`status`),
  ADD KEY `transactions_provider_reference_index` (`provider_reference`);

--
-- Index pour la table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_email_unique` (`email`),
  ADD UNIQUE KEY `users_phone_unique` (`phone`),
  ADD UNIQUE KEY `users_candidate_id_unique` (`candidate_id`),
  ADD KEY `users_role_index` (`role`),
  ADD KEY `users_status_index` (`status`);

--
-- Index pour la table `votes`
--
ALTER TABLE `votes`
  ADD PRIMARY KEY (`id`),
  ADD KEY `votes_user_id_foreign` (`user_id`),
  ADD KEY `votes_candidate_id_foreign` (`candidate_id`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `activity_logs`
--
ALTER TABLE `activity_logs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=123;

--
-- AUTO_INCREMENT pour la table `admins`
--
ALTER TABLE `admins`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT pour la table `candidates`
--
ALTER TABLE `candidates`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT pour la table `categories`
--
ALTER TABLE `categories`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT pour la table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `fraud_reports`
--
ALTER TABLE `fraud_reports`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `gallery_items`
--
ALTER TABLE `gallery_items`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT pour la table `ip_logs`
--
ALTER TABLE `ip_logs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `jobs`
--
ALTER TABLE `jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;

--
-- AUTO_INCREMENT pour la table `payments`
--
ALTER TABLE `payments`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT pour la table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=70;

--
-- AUTO_INCREMENT pour la table `results`
--
ALTER TABLE `results`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `settings`
--
ALTER TABLE `settings`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT pour la table `transactions`
--
ALTER TABLE `transactions`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT pour la table `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT pour la table `votes`
--
ALTER TABLE `votes`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `candidates`
--
ALTER TABLE `candidates`
  ADD CONSTRAINT `candidates_category_id_foreign` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`) ON UPDATE CASCADE;

--
-- Contraintes pour la table `fraud_reports`
--
ALTER TABLE `fraud_reports`
  ADD CONSTRAINT `fraud_reports_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE SET NULL,
  ADD CONSTRAINT `fraud_reports_vote_id_foreign` FOREIGN KEY (`vote_id`) REFERENCES `votes` (`id`) ON DELETE SET NULL;

--
-- Contraintes pour la table `ip_logs`
--
ALTER TABLE `ip_logs`
  ADD CONSTRAINT `ip_logs_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE SET NULL;

--
-- Contraintes pour la table `payments`
--
ALTER TABLE `payments`
  ADD CONSTRAINT `payments_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE SET NULL;

--
-- Contraintes pour la table `results`
--
ALTER TABLE `results`
  ADD CONSTRAINT `results_candidate_id_foreign` FOREIGN KEY (`candidate_id`) REFERENCES `candidates` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `results_category_id_foreign` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`) ON DELETE SET NULL;

--
-- Contraintes pour la table `transactions`
--
ALTER TABLE `transactions`
  ADD CONSTRAINT `transactions_payment_id_foreign` FOREIGN KEY (`payment_id`) REFERENCES `payments` (`id`) ON DELETE CASCADE;

--
-- Contraintes pour la table `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `users_candidate_id_foreign` FOREIGN KEY (`candidate_id`) REFERENCES `candidates` (`id`) ON DELETE SET NULL;

--
-- Contraintes pour la table `votes`
--
ALTER TABLE `votes`
  ADD CONSTRAINT `votes_candidate_id_foreign` FOREIGN KEY (`candidate_id`) REFERENCES `candidates` (`id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `votes_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE SET NULL;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
