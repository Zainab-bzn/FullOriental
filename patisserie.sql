-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 30, 2025 at 11:11 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `patisserie`
--

-- --------------------------------------------------------

--
-- Table structure for table `best_seller_boxes`
--

CREATE TABLE `best_seller_boxes` (
  `id` int(11) NOT NULL,
  `name` varchar(150) NOT NULL,
  `description` text DEFAULT NULL,
  `price` decimal(10,2) NOT NULL,
  `image` varchar(255) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `best_seller_boxes`
--

INSERT INTO `best_seller_boxes` (`id`, `name`, `description`, `price`, `image`, `created_at`) VALUES
(1, '6 PC Fun Assortment', 'Mix of 6 fun assorted cupcakes', 35.95, '/assets/fun-assortment.jpg', '2025-12-29 19:25:46'),
(2, 'Happy Birthday Dozen Box', 'A dozen birthday-themed cupcakes', 59.50, '/assets/hbd-dozen.jpg', '2025-12-29 19:25:46'),
(3, '6 PC Celebration Cupcakes', 'Perfect for celebrations and parties', 27.95, '/assets/celebration.jpg', '2025-12-29 19:25:46'),
(4, '6 PC Rainbow Cupcakes', 'Rainbow-colored assorted cupcakes', 35.95, '/assets/rainbow-box.jpg', '2025-12-29 19:25:46');

-- --------------------------------------------------------

--
-- Table structure for table `cakes`
--

CREATE TABLE `cakes` (
  `id` int(11) NOT NULL,
  `name` varchar(150) NOT NULL,
  `description` text DEFAULT NULL,
  `price` decimal(10,2) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `cakes`
--

INSERT INTO `cakes` (`id`, `name`, `description`, `price`, `image`, `created_at`) VALUES
(1, 'Birthday Cake', 'Classic birthday cake with customizable flavors', NULL, '/assets/BirthdayCake.JPG', '2025-12-29 19:25:46'),
(2, 'Wedding Cake', 'Elegant wedding cake options', NULL, '/assets/weddingCake.JPG', '2025-12-29 19:25:46'),
(3, 'Mother\'s Day Cake', 'Elegant cake perfect for Mother\'s Day', NULL, '/assets/MothersDayCake.JPG', '2025-12-29 19:25:46'),
(4, 'Anniversary Cake', 'Special celebration cake for anniversaries', NULL, '/assets/anniversaryCake.JPG', '2025-12-29 19:25:46'),
(5, 'Gender Reveal Cake', 'Fun and exciting gender reveal cake', NULL, '/assets/genderRevealCake.JPG', '2025-12-29 19:25:46'),
(6, 'Graduation Cake', 'Perfect cake to celebrate graduation', NULL, '/assets/GradautionCake.JPG', '2025-12-29 19:25:46'),
(7, 'Valentine Cake', 'Romantic Valentine\'s Day cake', NULL, '/assets/valentineCake.JPG', '2025-12-29 19:25:46'),
(8, 'New Year Cake', 'Celebrate the new year with style', NULL, '/assets/newYearCake.JPG', '2025-12-29 19:25:46'),
(9, 'Ice Cream Cake', 'Delicious ice cream layered cake', NULL, '/assets/iceCreamCake.JPG', '2025-12-29 19:25:46'),
(10, 'English Cake', 'Traditional English-style cake', NULL, '/assets/EnglishCake.JPG', '2025-12-29 19:25:46');

-- --------------------------------------------------------

--
-- Table structure for table `cake_addons`
--

CREATE TABLE `cake_addons` (
  `id` int(11) NOT NULL,
  `addon_name` varchar(100) NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `cake_addons`
--

INSERT INTO `cake_addons` (`id`, `addon_name`, `price`, `created_at`) VALUES
(1, 'Nuts', 2.00, '2025-12-29 19:25:46'),
(2, 'Fruits', 3.00, '2025-12-29 19:25:46'),
(3, 'Crema', 2.00, '2025-12-29 19:25:46'),
(4, 'Extra Sprinkles', 1.50, '2025-12-29 19:25:46'),
(5, 'Custom Message', 3.00, '2025-12-29 19:25:46'),
(6, 'Gold Leaf', 5.00, '2025-12-29 19:25:46');

-- --------------------------------------------------------

--
-- Table structure for table `cake_fillings`
--

CREATE TABLE `cake_fillings` (
  `id` int(11) NOT NULL,
  `filling_name` varchar(100) NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `cake_fillings`
--

INSERT INTO `cake_fillings` (`id`, `filling_name`, `price`, `created_at`) VALUES
(1, 'Chocolate', 5.00, '2025-12-29 19:25:46'),
(2, 'Vanilla', 5.00, '2025-12-29 19:25:46'),
(3, 'Vanilla & Chocolate', 6.00, '2025-12-29 19:25:46'),
(4, 'Strawberry', 6.00, '2025-12-29 19:25:46'),
(5, 'Lemon', 6.00, '2025-12-29 19:25:46'),
(6, 'Caramel', 7.00, '2025-12-29 19:25:46');

-- --------------------------------------------------------

--
-- Table structure for table `cake_tiers`
--

CREATE TABLE `cake_tiers` (
  `id` int(11) NOT NULL,
  `tier_name` varchar(100) NOT NULL,
  `servings_min` int(11) DEFAULT NULL,
  `servings_max` int(11) DEFAULT NULL,
  `price` decimal(10,2) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `cake_tiers`
--

INSERT INTO `cake_tiers` (`id`, `tier_name`, `servings_min`, `servings_max`, `price`, `created_at`) VALUES
(1, '8–12 servings', 8, 12, 20.00, '2025-12-29 19:25:46'),
(2, '18–24 servings', 18, 24, 35.00, '2025-12-29 19:25:46'),
(3, '25–40 servings', 25, 40, 50.00, '2025-12-29 19:25:46');

-- --------------------------------------------------------

--
-- Table structure for table `cake_types`
--

CREATE TABLE `cake_types` (
  `id` int(11) NOT NULL,
  `name` varchar(150) NOT NULL,
  `photo_path` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `cake_types`
--

INSERT INTO `cake_types` (`id`, `name`, `photo_path`, `created_at`) VALUES
(1, 'Birthday Cake', 'BirthdayCake.JPG', '2025-12-29 19:25:46'),
(2, 'Wedding Cake', 'weddingCake.JPG', '2025-12-29 19:25:46'),
(3, 'Mother\'s Day Cake', 'MothersDayCake.JPG', '2025-12-29 19:25:46'),
(4, 'Anniversary Cake', 'anniversaryCake.JPG_1767114729154.JPG', '2025-12-29 19:25:46'),
(5, 'Gender Reveal Cake', 'genderRevealCake.JPG', '2025-12-29 19:25:46'),
(6, 'Graduation Cake', 'GradautionCake.JPG', '2025-12-29 19:25:46'),
(7, 'Valentine Cake', 'valentineCake.JPG', '2025-12-29 19:25:46'),
(8, 'New Year Cake', 'newYearCake.JPG', '2025-12-29 19:25:46'),
(9, 'Ice Cream Cake', 'iceCreamCake.JPG', '2025-12-29 19:25:46'),
(10, 'English Cake', 'EnglishCake.JPG', '2025-12-29 19:25:46');

-- --------------------------------------------------------

--
-- Table structure for table `cart`
--

CREATE TABLE `cart` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `product_id` int(11) DEFAULT NULL,
  `item_name` varchar(150) NOT NULL,
  `product_type` varchar(50) DEFAULT NULL,
  `quantity` int(11) DEFAULT 1,
  `price` decimal(10,2) NOT NULL,
  `image` varchar(255) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `custom_cakes`
--

CREATE TABLE `custom_cakes` (
  `id` int(11) NOT NULL,
  `cake_type_id` int(11) DEFAULT NULL,
  `cake_type` varchar(150) NOT NULL,
  `tier_id` int(11) DEFAULT NULL,
  `filling_id` int(11) DEFAULT NULL,
  `addons` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`addons`)),
  `notes` text DEFAULT NULL,
  `reference_photo` varchar(255) DEFAULT NULL,
  `total_price` decimal(10,2) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `custom_cakes`
--

INSERT INTO `custom_cakes` (`id`, `cake_type_id`, `cake_type`, `tier_id`, `filling_id`, `addons`, `notes`, `reference_photo`, `total_price`, `user_id`, `created_at`) VALUES
(1, 2, 'Wedding Cake', 1, 5, '[1,2,3]', NULL, NULL, 33.00, 1, '2025-12-29 19:26:47'),
(2, 2, 'Wedding Cake', 1, 5, '[4,3,5]', NULL, NULL, 32.50, 2, '2025-12-29 19:47:55'),
(4, 3, 'Mother\'s Day Cake', 2, 5, '[5]', NULL, NULL, 44.00, 2, '2025-12-29 20:39:26'),
(5, 2, 'Wedding Cake', 1, 5, '[3]', NULL, NULL, 28.00, 2, '2025-12-29 20:43:53'),
(6, 2, 'Wedding Cake', 1, 4, '[1]', NULL, NULL, 28.00, 2, '2025-12-29 21:02:10'),
(7, 2, 'Wedding Cake', 1, 4, '[1]', NULL, NULL, 28.00, 2, '2025-12-29 21:02:29'),
(9, 3, 'Mother\'s Day Cake', 2, 2, '[2,3]', NULL, NULL, 45.00, 2, '2025-12-29 21:34:13'),
(10, 2, 'Wedding Cake', 1, 2, '[1,2]', NULL, NULL, 30.00, 2, '2025-12-29 21:56:36'),
(11, 2, 'Wedding Cake', 1, 2, '[1,2,4]', NULL, NULL, 31.50, 2, '2025-12-29 22:16:37'),
(12, 3, 'Mother\'s Day Cake', 1, 2, '[1,6]', NULL, NULL, 32.00, 2, '2025-12-30 09:10:02'),
(13, 2, 'Wedding Cake', 1, 2, '[3]', NULL, NULL, 27.00, 2, '2025-12-30 09:16:06'),
(16, 3, 'Mother\'s Day Cake', 2, 2, '[4,5,3]', NULL, NULL, 46.50, 1, '2025-12-30 17:37:43'),
(18, 2, 'Wedding Cake', 1, 2, '[1,6]', NULL, NULL, 32.00, 1, '2025-12-30 17:51:53'),
(19, 2, 'Wedding Cake', 2, 1, NULL, NULL, NULL, 40.00, 1, '2025-12-30 18:06:54'),
(21, 2, 'Wedding Cake', 1, 1, '[2]', NULL, NULL, 28.00, 1, '2025-12-30 20:52:41'),
(23, 2, 'Wedding Cake', 1, 5, '[3,5]', NULL, NULL, 31.00, 1, '2025-12-30 21:20:39');

-- --------------------------------------------------------

--
-- Table structure for table `feedback`
--

CREATE TABLE `feedback` (
  `id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `order_id` int(11) DEFAULT NULL,
  `stars` int(11) NOT NULL,
  `comment` text DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ;

--
-- Dumping data for table `feedback`
--

INSERT INTO `feedback` (`id`, `user_id`, `order_id`, `stars`, `comment`, `created_at`) VALUES
(4, 1, NULL, 5, NULL, '2025-12-30 20:52:54');

-- --------------------------------------------------------

--
-- Table structure for table `individual_cupcakes`
--

CREATE TABLE `individual_cupcakes` (
  `id` int(11) NOT NULL,
  `name` varchar(150) NOT NULL,
  `description` text DEFAULT NULL,
  `price` decimal(10,2) NOT NULL,
  `image` varchar(255) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `individual_cupcakes`
--

INSERT INTO `individual_cupcakes` (`id`, `name`, `description`, `price`, `image`, `created_at`) VALUES
(1, 'Cookie Monster', 'Delicious cookie-flavored cupcake with chocolate chips', 5.95, '/assets/cookie-monster.jpg', '2025-12-29 19:25:46'),
(2, 'Rainbow Cupcake', 'Colorful rainbow-layered cupcake with sprinkles', 5.95, '/assets/rainbow.jpg', '2025-12-29 19:25:46'),
(3, 'Red Velvet Cupcake', 'Classic red velvet with cream cheese frosting', 4.95, '/assets/red-velvet.jpg', '2025-12-29 19:25:46'),
(4, 'Peanut Buttercream Cupcake', 'Rich peanut butter flavor with creamy frosting', 4.95, '/assets/peanut-butter.jpg', '2025-12-29 19:25:46'),
(5, 'Poop Emoji Cupcake', 'Fun emoji-shaped cupcake for special occasions', 5.95, '/assets/poop-emoji.jpg', '2025-12-29 19:25:46');

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `id` int(11) NOT NULL,
  `order_number` varchar(50) NOT NULL,
  `customer_name` varchar(150) NOT NULL,
  `customer_email` varchar(100) NOT NULL,
  `customer_address` text NOT NULL,
  `total_amount` decimal(10,2) NOT NULL,
  `status` varchar(50) DEFAULT 'pending',
  `user_id` int(11) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `orders`
--

INSERT INTO `orders` (`id`, `order_number`, `customer_name`, `customer_email`, `customer_address`, `total_amount`, `status`, `user_id`, `created_at`) VALUES
(1, 'ORD-1767043920646', 'R', 'R@gmail.com', 'kjkjnk', 60.00, 'pending', 2, '2025-12-29 21:32:00'),
(2, 'ORD-1767044066033', 'R', 'R@gmail.com', 'eff', 45.00, 'pending', 2, '2025-12-29 21:34:26'),
(3, 'ORD-1767115632992', 'z', 'z@gmail.com', 'hh', 34.00, 'pending', 1, '2025-12-30 17:27:12'),
(4, 'ORD-1767116279174', 'z', 'z@gmail.com', 'tyre', 46.50, 'pending', 1, '2025-12-30 17:37:59'),
(5, 'ORD-1767116641537', 'z', 'z@gmail.com', 'tyre', 44.00, 'pending', 1, '2025-12-30 17:44:01'),
(6, 'ORD-1767124739242', 'z', 'z@gmail.com', 'aitit', 35.00, 'pending', 1, '2025-12-30 19:58:59'),
(7, 'ORD-1767127973127', 'z', 'z@gmail.com', '0', 28.00, 'pending', 1, '2025-12-30 20:52:53'),
(8, 'ORD-1767128027332', 'z', 'z@gmail.com', '0', 40.00, 'pending', 1, '2025-12-30 20:53:47');

-- --------------------------------------------------------

--
-- Table structure for table `order_items`
--

CREATE TABLE `order_items` (
  `id` int(11) NOT NULL,
  `order_id` int(11) NOT NULL,
  `item_name` varchar(150) NOT NULL,
  `item_type` varchar(50) DEFAULT NULL,
  `custom_cake_id` int(11) DEFAULT NULL,
  `quantity` int(11) DEFAULT 1,
  `price` decimal(10,2) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `order_items`
--

INSERT INTO `order_items` (`id`, `order_id`, `item_name`, `item_type`, `custom_cake_id`, `quantity`, `price`, `created_at`) VALUES
(1, 1, 'Wedding Cake', 'custom_cake', NULL, 2, 30.00, '2025-12-29 21:32:00'),
(2, 2, 'Mother\'s Day Cake', 'custom_cake', 9, 1, 45.00, '2025-12-29 21:34:26'),
(3, 3, 'Mother\'s Day Cake', 'custom_cake', NULL, 1, 34.00, '2025-12-30 17:27:13'),
(4, 4, 'Mother\'s Day Cake', 'custom_cake', 16, 1, 46.50, '2025-12-30 17:37:59'),
(5, 5, 'Mother\'s Day Cake', 'custom_cake', NULL, 1, 44.00, '2025-12-30 17:44:01'),
(6, 6, 'Birthday Cake', 'custom_cake', NULL, 1, 35.00, '2025-12-30 19:58:59'),
(7, 7, 'Wedding Cake', 'custom_cake', 21, 1, 28.00, '2025-12-30 20:52:53'),
(8, 8, 'Mother\'s Day Cake', 'custom_cake', NULL, 1, 40.00, '2025-12-30 20:53:47');

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `price` decimal(10,2) NOT NULL,
  `category` varchar(50) DEFAULT 'cupcake',
  `image` varchar(255) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `email`, `password`, `created_at`) VALUES
(1, 'z', 'z@gmail.com', 'z', '2025-12-29 19:26:30'),
(2, 'R', 'R@gmail.com', 'r', '2025-12-29 19:47:45');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `best_seller_boxes`
--
ALTER TABLE `best_seller_boxes`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `cakes`
--
ALTER TABLE `cakes`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `cake_addons`
--
ALTER TABLE `cake_addons`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `cake_fillings`
--
ALTER TABLE `cake_fillings`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `cake_tiers`
--
ALTER TABLE `cake_tiers`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `cake_types`
--
ALTER TABLE `cake_types`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `cart`
--
ALTER TABLE `cart`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `unique_cart_item` (`user_id`,`product_id`);

--
-- Indexes for table `custom_cakes`
--
ALTER TABLE `custom_cakes`
  ADD PRIMARY KEY (`id`),
  ADD KEY `cake_type_id` (`cake_type_id`),
  ADD KEY `tier_id` (`tier_id`),
  ADD KEY `filling_id` (`filling_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `feedback`
--
ALTER TABLE `feedback`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `individual_cupcakes`
--
ALTER TABLE `individual_cupcakes`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `order_number` (`order_number`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `order_items`
--
ALTER TABLE `order_items`
  ADD PRIMARY KEY (`id`),
  ADD KEY `order_id` (`order_id`),
  ADD KEY `custom_cake_id` (`custom_cake_id`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `best_seller_boxes`
--
ALTER TABLE `best_seller_boxes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `cakes`
--
ALTER TABLE `cakes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `cake_addons`
--
ALTER TABLE `cake_addons`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `cake_fillings`
--
ALTER TABLE `cake_fillings`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `cake_tiers`
--
ALTER TABLE `cake_tiers`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `cake_types`
--
ALTER TABLE `cake_types`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `cart`
--
ALTER TABLE `cart`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `custom_cakes`
--
ALTER TABLE `custom_cakes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- AUTO_INCREMENT for table `feedback`
--
ALTER TABLE `feedback`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `individual_cupcakes`
--
ALTER TABLE `individual_cupcakes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `order_items`
--
ALTER TABLE `order_items`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `cart`
--
ALTER TABLE `cart`
  ADD CONSTRAINT `cart_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `custom_cakes`
--
ALTER TABLE `custom_cakes`
  ADD CONSTRAINT `custom_cakes_ibfk_1` FOREIGN KEY (`cake_type_id`) REFERENCES `cake_types` (`id`) ON DELETE SET NULL,
  ADD CONSTRAINT `custom_cakes_ibfk_2` FOREIGN KEY (`tier_id`) REFERENCES `cake_tiers` (`id`) ON DELETE SET NULL,
  ADD CONSTRAINT `custom_cakes_ibfk_3` FOREIGN KEY (`filling_id`) REFERENCES `cake_fillings` (`id`) ON DELETE SET NULL,
  ADD CONSTRAINT `custom_cakes_ibfk_4` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE SET NULL;

--
-- Constraints for table `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE SET NULL;

--
-- Constraints for table `order_items`
--
ALTER TABLE `order_items`
  ADD CONSTRAINT `order_items_ibfk_1` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `order_items_ibfk_2` FOREIGN KEY (`custom_cake_id`) REFERENCES `custom_cakes` (`id`) ON DELETE SET NULL;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
