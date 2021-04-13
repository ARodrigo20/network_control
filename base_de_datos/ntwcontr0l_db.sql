-- phpMyAdmin SQL Dump
-- version 4.9.5
-- https://www.phpmyadmin.net/
--
-- Servidor: localhost:3306
-- Tiempo de generación: 31-12-2020 a las 08:20:46
-- Versión del servidor: 10.3.27-MariaDB
-- Versión de PHP: 7.3.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `ntwcontr0l_db`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `anticipos`
--

CREATE TABLE `anticipos` (
  `id_anticipos` bigint(20) UNSIGNED NOT NULL,
  `id_factura` bigint(20) UNSIGNED DEFAULT NULL,
  `tipoDocRel` varchar(20) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `nroDocRel` varchar(20) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `total` double(20,2) DEFAULT NULL,
  `est_reg` char(2) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cargo`
--

CREATE TABLE `cargo` (
  `id_car` bigint(20) UNSIGNED NOT NULL,
  `des_car` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `est_reg` char(2) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `cargo`
--

INSERT INTO `cargo` (`id_car`, `des_car`, `est_reg`, `created_at`, `updated_at`) VALUES
(1, 'Gerente General', 'A', '2020-06-08 19:47:14', '2020-06-20 01:14:45'),
(2, 'Gerente Admistrativo', 'A', '2020-06-08 20:42:12', '2020-06-20 01:14:30'),
(3, 'Gerente de Proyectos', 'A', '2020-06-20 01:20:37', '2020-06-20 01:20:37'),
(4, 'Jefe de Logistica', 'A', '2020-06-20 01:21:14', '2020-06-20 01:21:14'),
(5, 'Gerente Operaciones', 'A', '2020-06-23 21:50:23', '2020-06-23 21:50:23');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cargos`
--

CREATE TABLE `cargos` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cliente`
--

CREATE TABLE `cliente` (
  `id_cli` bigint(20) UNSIGNED NOT NULL,
  `razsoc_cli` varchar(200) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `numdoc_cli` char(11) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `ema_cli` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `id_tipdoc` bigint(20) UNSIGNED DEFAULT NULL,
  `est_reg` char(2) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'A',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `cliente`
--

INSERT INTO `cliente` (`id_cli`, `razsoc_cli`, `numdoc_cli`, `ema_cli`, `id_tipdoc`, `est_reg`, `created_at`, `updated_at`) VALUES
(1, 'razon', '10164090588', 'correo@gmail.com', 3, 'E', '2020-06-12 14:45:55', '2020-06-20 19:41:40'),
(2, 'qweqweqwe', '6546546', 'algo@algo.com', 2, 'E', '2020-06-12 14:47:37', '2020-06-12 18:16:40'),
(3, '798798797987', '9879879879', NULL, 2, 'E', '2020-06-12 16:13:56', '2020-06-20 19:41:46'),
(4, '12345678', '87654321', 'dsadfas@asdfa.com', 1, 'E', '2020-06-12 17:30:25', '2020-06-12 17:30:51'),
(5, '321654987', '98765432654', 'algo@algo.com', 1, 'E', '2020-06-13 07:39:18', '2020-06-20 19:41:52'),
(6, 'PETROLEOS DEL PERU PETRO PERU', '20100128218', NULL, 3, 'A', '2020-06-20 17:53:18', '2020-07-15 11:08:38'),
(7, 'LOGISTICA DE QUIMICOS DEL SUR S.A.C.', '20513398787', NULL, 3, 'A', '2020-06-20 17:57:55', '2020-07-15 11:08:25'),
(8, 'RACIONALIZACION EMPRESARIAL S.A.', '20100814162', NULL, 3, 'A', '2020-06-20 19:50:24', '2020-07-15 11:23:34'),
(9, 'SUPERINTENDENCIA DE BANCA SEGUROS Y AFP', '20131370564', NULL, 3, 'A', '2020-06-20 19:59:58', '2020-07-31 00:55:32'),
(10, 'COMPAÑIA MINERA ZAFRANAL', '20538837611', 'fernando.nunez@zafranal.com.pe', 3, 'A', '2020-06-20 20:13:15', '2020-06-20 20:13:15'),
(11, 'M3 INGENIERIA PERU S.A.C.', '20545451698', 'alexander.villena@m3eng.com', 3, 'A', '2020-06-20 20:19:04', '2020-06-20 20:37:02'),
(12, 'GOBIERNO REGIONAL DE AREQUIPA', '20498390570', NULL, 3, 'A', '2020-06-20 20:24:46', '2020-07-31 01:04:45'),
(13, 'CENCAR S.A.C.', '20137970563', 'contabilidad@cencarsa.com', 3, 'A', '2020-06-20 20:30:20', '2020-06-20 20:30:20'),
(14, 'TRAZO ARQ S.A.C.', '20455937974', 'jgonzalez@trazoarq.com', 3, 'A', '2020-06-20 20:35:19', '2020-06-20 20:35:19'),
(15, 'INVERSIONES VELASQUEZ E.I.R.L.', '20498357106', 'lavelasquez@hlavilla.com.pe', 3, 'A', '2020-06-20 20:45:33', '2020-11-11 05:51:50'),
(16, 'Alqsoft', '2010256988', 'Alqsoft@alqsoft.com', 3, 'E', '2020-06-26 01:21:30', '2020-06-26 01:44:21'),
(17, 'Empresa 1', '10715955621', 'empresa1@empresa1.com', 3, 'E', '2020-06-26 19:41:13', '2020-07-15 10:11:25'),
(18, 'LA JOYA MINING SAC', '20539627983', NULL, 3, 'A', '2020-07-31 00:44:31', '2020-07-31 00:44:31');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cliente_contacto`
--

CREATE TABLE `cliente_contacto` (
  `id_cli_con` bigint(20) UNSIGNED NOT NULL,
  `nom_cli_con` varchar(200) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `ema_cli_con` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `cel_cli_con` char(10) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `ane_cli_con` char(10) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `car_cli_con` char(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `id_cli` bigint(20) UNSIGNED DEFAULT NULL,
  `est_reg` char(2) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'A',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `cliente_contacto`
--

INSERT INTO `cliente_contacto` (`id_cli_con`, `nom_cli_con`, `ema_cli_con`, `cel_cli_con`, `ane_cli_con`, `car_cli_con`, `id_cli`, `est_reg`, `created_at`, `updated_at`) VALUES
(1, 'André Cruz', 'ajcruzg95@gmail.com', '953464926', NULL, 'Gerente General', 16, 'E', '2020-06-26 01:22:45', '2020-06-26 01:22:45'),
(2, 'Andre Cruz', 'andre@gmail.com', '953464926', '1002', 'Jefe de agencia', 17, 'E', '2020-06-26 19:42:56', '2020-06-26 19:43:40'),
(3, 'Christian Peña', 'cpeña@gmail.com', '123456789', '1003', 'Jefe de tienda', 17, 'E', '2020-06-26 19:42:56', '2020-06-26 19:43:40'),
(4, 'Luis Valdivia', 'lvaldivia@petroperu.com.pe', NULL, '201', 'Jefe  Planta ILO', 6, 'E', '2020-06-26 19:56:07', '2020-07-15 10:15:57'),
(5, 'Erik Jonathan rojas', NULL, '988573857', NULL, 'Jefe de Planta Sur/Sub Gerencia Distribucion', 6, 'E', '2020-07-15 10:15:57', '2020-07-15 10:19:12'),
(7, 'Erik Jonathan Rojas Yancaya', 'erojas@petroperu.com.pe', '988573857', '53130', 'Jefatura Planta Sur Sub Gerencia Distribución', 6, 'A', '2020-07-15 10:19:12', '2020-11-11 05:35:22'),
(9, 'Bernabe Chuquihuaccha', 'bernabe.chuquihuaccha@oiltanking.com', '989008804', '201', 'Jefatura Operaciones', 7, 'A', '2020-07-15 11:20:40', '2020-07-15 11:20:40'),
(10, 'Alexander Castillo Madrid', 'alexander.castillo@oiltanking.com', '994102774', '202', 'Supervisor Operaciones', 7, 'A', '2020-07-15 11:20:40', '2020-11-11 05:47:36'),
(11, 'Jhonny Málaga', 'jhonny.malaga@oiltanking.com', '981293859', '203', 'Operador Senior', 7, 'A', '2020-07-15 11:20:40', '2020-11-11 05:47:36'),
(12, 'Joel Gonzales', 'joel.gonzalez@oiltanking.com', '943902459', '204', 'Supervisor de HSSE/Q', 7, 'A', '2020-07-15 11:23:10', '2020-07-15 11:23:10'),
(13, 'Bony Alvarez Granda', 'balvarez@raciemsa.com.pe', '519598115', NULL, 'Jefatura TI', 8, 'A', '2020-07-15 11:41:32', '2020-07-15 11:41:32'),
(14, 'Victor Rojas Orihuela', 'vrojas@raciemsa.com.pe', '949566067', NULL, 'Asistente de TI', 8, 'A', '2020-07-15 11:41:32', '2020-07-15 11:41:32'),
(15, 'Percy Chambi Vargas', 'pchambi@raciemsa.com.pe', '958576038', '3821', 'Responsable de Compras Logística', 8, 'A', '2020-07-15 11:41:32', '2020-07-15 11:41:32'),
(16, 'Julio Cesar Rodriguez', 'jrodriguezv@sbs.gob.pe', '993503050', '5987', 'Logistica Compras', 9, 'A', '2020-07-31 01:04:22', '2020-07-31 01:04:22'),
(17, 'Paola Linarez', 'plinares@sbs.gob.pe', '999961838', NULL, 'Secretaria ODA', 9, 'A', '2020-07-31 01:04:22', '2020-07-31 01:04:22'),
(18, 'Julio Miranda', 'jmiranda@sbs.gob.pe', '957750941', NULL, 'Asistente Administrativo ODA', 9, 'A', '2020-07-31 01:04:22', '2020-07-31 01:04:22'),
(19, 'Jorge Luis Rivera Linares', 'jrivera@regionarequipa.gob.pe', '959713832', NULL, 'Jefe Informática', 12, 'A', '2020-07-31 01:19:16', '2020-11-11 05:50:45'),
(20, 'Manuel Delgado', 'manuel.delgado@oiltankig.com', '956381818', NULL, 'Coordinador de IT', 7, 'A', '2020-08-21 08:18:28', '2020-08-21 08:18:28'),
(21, 'Alexander Villena', NULL, NULL, NULL, 'Jefe de IT Peru', 11, 'A', '2020-11-08 21:43:41', '2020-11-08 21:43:41'),
(22, 'Lenin Munayco Aroste', 'lenin.munayco@oiltanking.com;', '998344861', NULL, 'logistica', 7, 'A', '2020-11-21 05:31:55', '2020-11-21 05:31:55');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cliente_direccion`
--

CREATE TABLE `cliente_direccion` (
  `id_cli_dir` bigint(20) UNSIGNED NOT NULL,
  `ciu_cli` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `dir_cli` varchar(200) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `tel_cli` char(10) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `id_cli` bigint(20) UNSIGNED DEFAULT NULL,
  `est_reg` char(2) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'A',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `cliente_direccion`
--

INSERT INTO `cliente_direccion` (`id_cli_dir`, `ciu_cli`, `dir_cli`, `tel_cli`, `id_cli`, `est_reg`, `created_at`, `updated_at`) VALUES
(1, 'Arequipa', 'Urb 12 de octubre C 12', '953464926', 16, 'E', '2020-06-26 01:22:45', '2020-06-26 01:22:45'),
(2, 'Arequipa', 'Av Ejercito 1009', '1234569', 17, 'E', '2020-06-26 19:42:56', '2020-06-26 19:42:56'),
(3, 'Ilo', 'av.lino urquieta nº-458', '564758', 6, 'E', '2020-06-26 19:56:07', '2020-07-15 10:15:57'),
(4, 'Mollendo', 'Av. Apurimac Nº-400 Islay Mollendo Arequipa Lima', '54534184', 6, 'A', '2020-07-15 10:15:57', '2020-11-12 23:17:29'),
(5, 'Arequipa Islay Matarani', 'Av. Ter. Portuario Matarani Nro. S/N', '5112411933', 7, 'E', '2020-07-15 11:20:40', '2020-11-11 05:47:36'),
(6, 'LIMA', 'Av. Republica de Panamá Nº- 2457 Santa Catalina La Victoria', NULL, 8, 'A', '2020-07-15 11:41:32', '2020-07-15 11:41:32'),
(7, 'JULIACA', 'CAR. Juliaca-Puno KM.11 (Hacienda Yungura) Puno-San Roman - Caracoto', NULL, 8, 'A', '2020-07-15 11:41:32', '2020-07-15 11:41:32'),
(8, 'AREQUIPA', 'CAR. Variante Uchumayo KM. 5.5 (El Cural) Cerro Colorado', NULL, 8, 'A', '2020-07-15 11:41:32', '2020-07-15 11:41:32'),
(9, 'AREQUIPA', 'LT.11 Y 12 MZA. P LOTE SAN JOSE(ALTURA KM.982CARR.PANAMERICANA) AREQUIPA LA JOYA', '977136958', 18, 'A', '2020-07-31 00:54:48', '2020-07-31 00:54:48'),
(10, 'TRUJILLO', 'AUTOPISTA SALAVERRY KM. 2.8 LOTE.4A1 PTO. SALAVERRY LA LIBERTAD - TRIJILLO', NULL, 18, 'A', '2020-07-31 00:54:48', '2020-07-31 00:54:48'),
(11, 'TRUJILLO', 'AV. AV. 02 MZA. C-11 LOTE. 19 Z.I. ZANO INDUSTRIAL L LIBERTAD TRUJILLO LA ESPERANZA', NULL, 18, 'A', '2020-07-31 00:54:48', '2020-07-31 00:54:48'),
(12, 'Arequipa', 'Calle Los Arces 302, Cayma', '054-272990', 9, 'A', '2020-07-31 01:04:22', '2020-07-31 01:04:22'),
(13, 'Arequipa', 'AV.UNION NRO. 200 URB CESAR VALLEJO AREQUIPA PAUCARPATA', '54382860', 12, 'A', '2020-07-31 01:19:16', '2020-11-11 05:50:45'),
(14, 'Arequipa', 'Citi Center', NULL, 11, 'A', '2020-11-08 21:43:04', '2020-11-08 21:43:04'),
(15, 'Mollendo', 'Av. Apurímac N°-400 Islay Mollendo Arequipa', '16145000', 6, 'E', '2020-11-11 05:37:49', '2020-11-11 05:56:31'),
(16, 'Islay Matarani', 'Av. Term.Portuario Matarani S/N', '5112411933', 7, 'A', '2020-11-11 05:47:36', '2020-11-11 05:47:36'),
(17, 'Pisco - Pracas Ica', 'Av. jose San Martin , Mz H , Nº- 02', '5156581600', 7, 'A', '2020-11-21 05:34:31', '2020-11-21 05:34:31');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cotizacion_proveedor`
--

CREATE TABLE `cotizacion_proveedor` (
  `cotprov_id` bigint(20) UNSIGNED NOT NULL,
  `solcli_id` bigint(20) UNSIGNED DEFAULT NULL,
  `id_proy` bigint(20) UNSIGNED DEFAULT NULL,
  `id_cli` bigint(20) UNSIGNED DEFAULT NULL,
  `id_prov` bigint(20) UNSIGNED DEFAULT NULL,
  `cotprov_fec` datetime DEFAULT NULL,
  `cotprov_razsoc` varchar(250) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `cotprov_ruc` char(20) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `cotprov_tipdoc` char(20) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `cotprov_dir` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `cotprov_con` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `cotprov_ema` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `est_reg` char(3) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `est_env` char(1) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `cotprov_cod` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `id_col` bigint(20) UNSIGNED DEFAULT NULL,
  `cotprov_col_nom` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `cotprov_col_usu` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `cotizacion_proveedor`
--

INSERT INTO `cotizacion_proveedor` (`cotprov_id`, `solcli_id`, `id_proy`, `id_cli`, `id_prov`, `cotprov_fec`, `cotprov_razsoc`, `cotprov_ruc`, `cotprov_tipdoc`, `cotprov_dir`, `cotprov_con`, `cotprov_ema`, `est_reg`, `est_env`, `cotprov_cod`, `id_col`, `cotprov_col_nom`, `cotprov_col_usu`, `created_at`, `updated_at`) VALUES
(1, NULL, NULL, NULL, 1, '2020-11-07 18:37:48', 'Anixter Peru S.A.C.', '20418354781', 'RUC', 'CAL.ONTARIO NRO. 157 URB. LA CAMPIÑA  CHORRILLOS  LIMA', 'Maria  Teresa Chavez', 'maria.chavez@anixter.com', 'AN', '0', '#0001-NTWC-2020', 2, 'Oscar HilburgDaza Rodriguez', 'oscar.daza@ntwcontrol.com', '2020-11-08 04:37:48', '2020-11-08 04:39:44'),
(2, NULL, 4, NULL, 3, '2020-11-08 12:22:12', 'MAFORT SERVICE S.A.C.', '20510300770', 'RUC', 'Av. Circunvalación Nº595 Urb. San Ignacio de Loyola Santiago de Surco', 'Flor de Maria Cojal Tolentino', 'fcojal@mafortservice.com', 'AN', '0', '#0002-NTWC-2020', 2, 'Oscar HilburgDaza Rodriguez', 'oscar.daza@ntwcontrol.com', '2020-11-08 22:22:12', '2020-11-10 03:23:08'),
(3, NULL, 10, NULL, 1, '2020-11-20 19:12:49', 'ANIXTER PERU S.A.C.', '20418354781', 'RUC', 'CAL.ONTARIO NRO. 157 URB. LA CAMPIÑA  CHORRILLOS  LIMA', 'Maria  Teresa Chavez', 'maria.chavez@anixter.com', 'A', '0', '#0003-NTWC-2020', 2, 'Oscar HilburgDaza Rodriguez', 'oscar.daza@ntwcontrol.com', '2020-11-21 05:12:49', '2020-11-21 05:12:49'),
(4, NULL, 10, NULL, 1, '2020-11-20 19:17:37', 'ANIXTER PERU S.A.C.', '20418354781', 'RUC', 'CAL.ONTARIO NRO. 157 URB. LA CAMPIÑA  CHORRILLOS  LIMA', 'Maria  Teresa Chavez', 'maria.chavez@anixter.com', 'A', '0', '#0004-NTWC-2020', 2, 'Oscar HilburgDaza Rodriguez', 'oscar.daza@ntwcontrol.com', '2020-11-21 05:17:37', '2020-11-21 05:17:37');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cotizacion_proveedor_det`
--

CREATE TABLE `cotizacion_proveedor_det` (
  `cotprovdet_id` bigint(20) UNSIGNED NOT NULL,
  `cotprovdet_cant` int(11) DEFAULT NULL,
  `cotprovdet_desc` varchar(2000) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `cotprov_id` bigint(20) UNSIGNED DEFAULT NULL,
  `id_prod` bigint(20) UNSIGNED DEFAULT NULL,
  `cotprovdet_prod_codint` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `cotprovdet_prod_numpar` varchar(200) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `cotprovdet_prod_fabr` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `cotprovdet_prod_marc` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `cotprovdet_prod_unimed` char(5) COLLATE utf8mb4_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `cotizacion_proveedor_det`
--

INSERT INTO `cotizacion_proveedor_det` (`cotprovdet_id`, `cotprovdet_cant`, `cotprovdet_desc`, `cotprov_id`, `id_prod`, `cotprovdet_prod_codint`, `cotprovdet_prod_numpar`, `cotprovdet_prod_fabr`, `cotprovdet_prod_marc`, `cotprovdet_prod_unimed`) VALUES
(1, 3, 'CABLE CAT6 4P UTP 24AWG LSZH WT (305M) COLOR WHITE', 1, 5, 'CMZ-00424UTP-6U', '1427070-2', 'COMMSCOPE', 'COMMSCOPE', 'M'),
(2, 1, 'Servicio de Mantenimiento Preventivo de UPS Trifásico  Potencia 40 KVA  MODELO ITA 2  MARCA LIBERTY - VERTIV', 2, 96, NULL, 'MANTOUPSTRIF', NULL, NULL, NULL),
(3, 20, 'TX6 PLUS CAT6 UTP PATCHCORD T568B LSZH 24AWG STRANDED COLOR BLUE 3MT 9.84FT', 3, 22, NULL, 'UTPSPL3MBUY', 'PANDUIT', 'PANDUIT', 'Pza'),
(4, 20, 'TX6A 10Gig SHIELDED S/FTP PATCH CORD T568B LSZH/CM 26AWG  STRANDED COLOR BLUE 2MT', 3, 102, NULL, 'STP6X2MBU', 'PANDUIT', 'PANDUIT', 'Pza'),
(5, 20, 'TX6A 10Gig SHIELDED S/FTP PATCH CORD T568B LSZH/CM 26AWG  STRANDED COLOR BLUE 2MT', 4, 102, NULL, 'STP6X2MBU', 'PANDUIT', 'PANDUIT', 'Pza'),
(6, 20, 'TX6 10Gig SHIELDED S/FTP PATC CORD T568B LSZH/CM  26AWG STRANDED BLUE 3MT 10FT', 4, 103, NULL, 'STP6X3MBU', 'PANDUIT', 'PANDUIT', 'Pza');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `descuentos`
--

CREATE TABLE `descuentos` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `direccion_entregas`
--

CREATE TABLE `direccion_entregas` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `documento_relacionados`
--

CREATE TABLE `documento_relacionados` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `empresa`
--

CREATE TABLE `empresa` (
  `id_emp` bigint(20) UNSIGNED NOT NULL,
  `nom_emp` varchar(200) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `numdoc_emp` char(20) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `dir_emp` varchar(150) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `dis_emp` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `ciu_emp` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `tel_emp` char(20) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `cel_emp` char(20) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `codciu_emp` char(20) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `img_emp` varchar(200) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `imgext_emp` varchar(20) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `id_tipdoc` bigint(20) UNSIGNED DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `empresa`
--

INSERT INTO `empresa` (`id_emp`, `nom_emp`, `numdoc_emp`, `dir_emp`, `dis_emp`, `ciu_emp`, `tel_emp`, `cel_emp`, `codciu_emp`, `img_emp`, `imgext_emp`, `id_tipdoc`, `created_at`, `updated_at`) VALUES
(1, 'NETWORK CONTROL  S.R.L.', '20601974003', 'Urb. villa Eléctrica Mza. C Lote 17', 'jose Luis Bustamante y Rivero', 'Arequipa', '51-54-545', '987740664', '0004000', 'Logo nmetwork.jpeg', 'jpeg', 3, '2020-07-17 06:48:26', '2020-09-20 19:45:34');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `envio`
--

CREATE TABLE `envio` (
  `id_envio` bigint(20) UNSIGNED NOT NULL,
  `codTraslado` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `desTraslado` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `indTransbordo` tinyint(1) DEFAULT NULL,
  `pesoTotal` double(8,2) DEFAULT NULL,
  `undPesoTotal` varchar(10) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `numBultos` double(50,2) DEFAULT NULL,
  `modTraslado` varchar(5) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `fecTraslado` datetime DEFAULT NULL,
  `numContenedor` varchar(10) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `codPuerto` varchar(10) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `id_transportista` bigint(20) UNSIGNED DEFAULT NULL,
  `ubigueoLlegada` varchar(10) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `direccionLlegada` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `ubigueoSalida` varchar(10) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `direccionSalida` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `est_reg` char(2) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `fabricante`
--

CREATE TABLE `fabricante` (
  `id_fab` bigint(20) UNSIGNED NOT NULL,
  `des_fab` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `est_reg` char(2) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `fabricante`
--

INSERT INTO `fabricante` (`id_fab`, `des_fab`, `est_reg`, `created_at`, `updated_at`) VALUES
(1, 'INTEL', 'A', '2020-06-08 20:31:23', '2020-06-12 16:55:35'),
(2, 'Lumen', 'E', '2020-06-12 00:32:56', '2020-06-12 00:33:08'),
(3, 'NEC', 'A', '2020-06-12 16:57:51', '2020-06-12 16:57:51'),
(4, 'QNAP', 'A', '2020-06-12 16:58:17', '2020-11-17 21:18:22'),
(5, 'HP', 'A', '2020-06-12 18:45:18', '2020-06-12 18:45:18'),
(6, 'COMMSCOPE', 'A', '2020-06-23 22:00:35', '2020-06-23 22:00:35'),
(7, 'CABLOFIL', 'A', '2020-06-23 22:01:03', '2020-06-23 22:01:03'),
(8, 'TUNDRA', 'A', '2020-06-23 22:01:58', '2020-06-23 22:01:58'),
(9, 'AXIS', 'A', '2020-06-23 22:02:08', '2020-06-23 22:02:08'),
(10, 'QUEST', 'A', '2020-06-23 22:02:47', '2020-06-23 22:02:47'),
(11, 'PANDUIT', 'A', '2020-06-23 22:02:57', '2020-06-23 22:02:57'),
(12, 'SIEMON', 'A', '2020-06-23 22:03:45', '2020-06-23 22:03:45'),
(13, 'BELDEN', 'A', '2020-06-23 22:03:57', '2020-06-23 22:03:57'),
(14, 'CISCO', 'A', '2020-06-23 22:04:09', '2020-06-23 22:04:09'),
(15, 'ALLIED TELESIS', 'A', '2020-06-23 22:04:28', '2020-06-23 22:04:28'),
(16, 'UBIQUITI', 'A', '2020-06-23 22:04:50', '2020-06-23 22:04:50'),
(17, 'HIKVISION', 'A', '2020-06-23 22:05:06', '2020-06-23 22:05:06'),
(18, 'BOSCH', 'A', '2020-06-23 22:05:18', '2020-06-23 22:05:18'),
(19, 'HONEYWELL', 'A', '2020-06-23 22:05:32', '2020-06-23 22:05:32'),
(20, 'MIRCOM', 'A', '2020-06-23 22:05:42', '2020-06-23 22:05:42'),
(21, 'APC', 'A', '2020-06-23 22:05:56', '2020-06-23 22:05:56'),
(22, 'EMERSON', 'A', '2020-06-23 22:06:11', '2020-06-23 22:06:11'),
(23, 'VERTIV', 'A', '2020-06-23 22:06:57', '2020-06-23 22:06:57'),
(24, 'FLUKE', 'A', '2020-06-25 23:59:30', '2020-06-25 23:59:30'),
(25, 'AXIS', 'A', '2020-07-07 16:39:56', '2020-07-07 16:39:56'),
(26, '3M', 'A', '2020-07-14 08:22:04', '2020-07-14 08:22:04'),
(27, 'CABLOFIL', 'A', '2020-07-14 08:52:50', '2020-07-14 08:52:50'),
(28, 'LEGRAND', 'A', '2020-07-14 08:55:36', '2020-07-14 08:55:36'),
(29, 'DIXON', 'A', '2020-07-19 03:44:01', '2020-07-19 03:44:01'),
(30, 'OEM', 'A', '2020-07-19 04:05:37', '2020-07-19 04:05:37'),
(31, 'AXIS', 'A', '2020-11-08 16:46:06', '2020-11-08 16:46:06'),
(32, 'FOSMON', 'A', '2020-11-12 02:49:31', '2020-11-12 02:49:31'),
(33, 'VENTION', 'A', '2020-11-12 02:56:11', '2020-11-12 02:56:11');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `facturas`
--

CREATE TABLE `facturas` (
  `id_factura` bigint(20) UNSIGNED NOT NULL,
  `tipoDoc` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `serie` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `correlativo` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `fechaEmision` datetime DEFAULT NULL,
  `solcli_id` bigint(20) UNSIGNED DEFAULT NULL,
  `id_cli` bigint(20) UNSIGNED DEFAULT NULL,
  `id_emp` bigint(20) UNSIGNED DEFAULT NULL,
  `tipoMoneda` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `sumOtrosCargos` double(8,2) DEFAULT NULL,
  `mtoOperGravadas` double(8,2) DEFAULT NULL,
  `mtoOperInafectas` double(8,2) DEFAULT NULL,
  `mtoOperExoneradas` double(8,2) DEFAULT NULL,
  `mtoOperExportacion` double(8,2) DEFAULT NULL,
  `mtoIGV` double(8,2) DEFAULT NULL,
  `mtoISC` double(8,2) DEFAULT NULL,
  `mtoOtrosTributos` double(8,2) DEFAULT NULL,
  `icbper` double(8,2) DEFAULT NULL,
  `mtoImpVenta` double(8,2) DEFAULT NULL,
  `id_legends` bigint(20) UNSIGNED DEFAULT NULL,
  `id_guias` bigint(20) UNSIGNED DEFAULT NULL,
  `id_relDocs` bigint(20) UNSIGNED DEFAULT NULL,
  `observacion` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `compra` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `mtoBaseIsc` double(8,2) DEFAULT NULL,
  `mtoBaseOth` double(8,2) DEFAULT NULL,
  `totalImpuestos` double(8,2) DEFAULT NULL,
  `ublVersion` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `tipoOperacion` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `fecVencimiento` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `sumDsctoGlobal` double(8,2) DEFAULT NULL,
  `mtoDescuentos` double(8,2) DEFAULT NULL,
  `mtoOperGratuitas` double(8,2) DEFAULT NULL,
  `totalAnticipos` double(8,2) DEFAULT NULL,
  `id_guiaEmbebida` bigint(20) UNSIGNED DEFAULT NULL,
  `id_seller` bigint(20) UNSIGNED DEFAULT NULL,
  `id_direccion_entrega` bigint(20) UNSIGNED DEFAULT NULL,
  `descuentos` double(8,2) DEFAULT NULL,
  `id_cargo` bigint(20) UNSIGNED DEFAULT NULL,
  `mtoCargos` double(8,2) DEFAULT NULL,
  `valorVenta` double(8,2) DEFAULT NULL,
  `observaciones` varchar(20) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `est_reg` char(2) COLLATE utf8mb4_unicode_ci NOT NULL,
  `est_env` char(2) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `factura_detalles`
--

CREATE TABLE `factura_detalles` (
  `id_det_fac` bigint(20) UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `unidad` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `cantidad` double(8,2) DEFAULT NULL,
  `codProducto` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `codProdSunat` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `codProdGS1` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `descripcion` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `mtoValorUnitario` double(8,2) DEFAULT NULL,
  `descuento` double(8,2) DEFAULT NULL,
  `igv` double(8,2) DEFAULT NULL,
  `tipAfeIgv` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `isc` double(8,2) DEFAULT NULL,
  `tipSisIsc` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `totalImpuestos` double(8,2) DEFAULT NULL,
  `mtoPrecioUnitario` double(8,2) DEFAULT NULL,
  `mtoValorVenta` double(8,2) DEFAULT NULL,
  `mtoValorGratuito` double(8,2) DEFAULT NULL,
  `mtoBaseIgv` double(8,2) DEFAULT NULL,
  `porcentajeIgv` double(8,2) DEFAULT NULL,
  `mtoBaseIsc` double(8,2) DEFAULT NULL,
  `porcentajeIsc` double(8,2) DEFAULT NULL,
  `mtoBaseOth` double(8,2) DEFAULT NULL,
  `porcentajeOth` double(8,2) DEFAULT NULL,
  `otroTributo` double(8,2) DEFAULT NULL,
  `icbper` double(8,2) DEFAULT NULL,
  `factorIcbper` double(8,2) DEFAULT NULL,
  `est_reg` char(2) COLLATE utf8mb4_unicode_ci NOT NULL,
  `id_factura` bigint(20) UNSIGNED DEFAULT NULL,
  `id_prod` bigint(20) UNSIGNED DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `failed_jobs`
--

CREATE TABLE `failed_jobs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `connection` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `queue` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `payload` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `exception` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `gasto`
--

CREATE TABLE `gasto` (
  `id_gas` bigint(20) UNSIGNED NOT NULL,
  `gas_fec` datetime NOT NULL,
  `gas_fac` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `gas_subtot` double(8,2) DEFAULT NULL,
  `gas_igv` double(8,2) DEFAULT NULL,
  `gas_tot` double(8,2) DEFAULT NULL,
  `id_prov` bigint(20) UNSIGNED DEFAULT NULL,
  `prov_razsoc` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `prov_ruc` char(11) COLLATE utf8mb4_unicode_ci NOT NULL,
  `id_proy` bigint(20) UNSIGNED DEFAULT NULL,
  `gas_mon` char(1) COLLATE utf8mb4_unicode_ci NOT NULL,
  `gas_tipcam` double(8,2) DEFAULT NULL,
  `gas_totdol` double(8,2) DEFAULT NULL,
  `gas_desc` varchar(200) COLLATE utf8mb4_unicode_ci NOT NULL,
  `est_reg` char(2) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `gas_fac_ser` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `guia_embebidas`
--

CREATE TABLE `guia_embebidas` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `guia_facturas`
--

CREATE TABLE `guia_facturas` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `guia_remision`
--

CREATE TABLE `guia_remision` (
  `id_guia_remision` bigint(20) UNSIGNED NOT NULL,
  `tipoDoc` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `serie` varchar(20) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `correlativo` varchar(20) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `observacion` varchar(200) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `fechaEmision` datetime DEFAULT NULL,
  `id_emp` bigint(20) UNSIGNED DEFAULT NULL,
  `id_cli` bigint(20) UNSIGNED DEFAULT NULL,
  `id_envio` bigint(20) UNSIGNED DEFAULT NULL,
  `observaciones` varchar(20) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `solcli_id` bigint(20) UNSIGNED DEFAULT NULL,
  `est_reg` char(2) COLLATE utf8mb4_unicode_ci NOT NULL,
  `est_env` char(2) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `guia_remision_det`
--

CREATE TABLE `guia_remision_det` (
  `id_guia_remision_det` bigint(20) UNSIGNED NOT NULL,
  `id_guia_remision` bigint(20) UNSIGNED DEFAULT NULL,
  `codigo` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `descripcion` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `unidad` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `cantidad` int(11) DEFAULT NULL,
  `codProdSunat` varchar(10) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `id_prod` bigint(20) UNSIGNED DEFAULT NULL,
  `est_reg` char(2) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `kardex`
--

CREATE TABLE `kardex` (
  `id_kar` bigint(20) UNSIGNED NOT NULL,
  `fec_kar` datetime NOT NULL,
  `cod_kar` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `id_ord_det` bigint(20) UNSIGNED DEFAULT NULL,
  `id_ord_com` bigint(20) UNSIGNED DEFAULT NULL,
  `prod_desc` varchar(250) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `prod_numpar` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `prod_unimed` char(5) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `prod_cant` double(8,2) DEFAULT NULL,
  `prov_razsoc` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `fac_kar` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `guirem_kar` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `bol_kar` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `tip_kar` char(1) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `id_col` bigint(20) UNSIGNED DEFAULT NULL,
  `col_usu` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `est_reg` char(2) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `leyenda_facturas`
--

CREATE TABLE `leyenda_facturas` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `marca`
--

CREATE TABLE `marca` (
  `id_mar` bigint(20) UNSIGNED NOT NULL,
  `des_mar` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `est_reg` char(2) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `marca`
--

INSERT INTO `marca` (`id_mar`, `des_mar`, `est_reg`, `created_at`, `updated_at`) VALUES
(1, 'DELL', 'E', '2020-06-08 20:31:12', '2020-06-12 18:33:06'),
(2, 'TP-LINK', 'E', '2020-06-11 16:01:30', '2020-06-12 18:33:09'),
(3, 'D-LINK', 'E', '2020-06-12 16:52:17', '2020-06-12 18:33:13'),
(4, 'CISCO', 'E', '2020-06-12 16:52:26', '2020-06-12 18:33:15'),
(5, 'PANDUIT', 'A', '2020-06-12 18:36:17', '2020-06-12 18:36:17'),
(6, 'HP', 'A', '2020-06-12 18:45:04', '2020-06-12 18:45:04'),
(7, 'CONDUIT', 'A', '2020-06-20 17:35:35', '2020-06-20 17:35:35'),
(8, 'FLUKE', 'A', '2020-06-20 17:36:09', '2020-06-20 17:36:09'),
(9, 'SCHNEIDER', 'A', '2020-06-20 17:36:30', '2020-06-20 17:36:30'),
(10, 'INDECO', 'A', '2020-06-20 17:36:56', '2020-06-20 17:36:56'),
(11, 'LEVITON', 'A', '2020-06-20 17:37:20', '2020-06-20 17:37:20'),
(12, 'KBA', 'A', '2020-06-20 17:37:34', '2020-06-20 17:37:34'),
(13, 'CONDUIT', 'E', '2020-06-20 17:38:00', '2020-06-23 21:46:21'),
(14, 'LEGRANT', 'A', '2020-06-20 17:38:32', '2020-06-20 17:38:32'),
(15, 'LENOVO', 'A', '2020-06-20 17:38:47', '2020-06-20 17:38:47'),
(16, 'COMMSCOPE', 'A', '2020-06-25 22:28:22', '2020-06-25 22:28:22'),
(17, 'Prueba marca', 'E', '2020-06-26 01:19:00', '2020-06-26 01:20:00'),
(18, 'MOTOROLA', 'A', '2020-06-26 19:52:06', '2020-06-26 19:52:06'),
(19, 'AXIS', 'A', '2020-07-07 16:31:25', '2020-07-07 16:31:25'),
(20, '3M', 'A', '2020-07-14 08:14:11', '2020-07-14 08:14:11'),
(21, 'CABLOFIL', 'A', '2020-07-14 08:51:22', '2020-07-14 08:51:22'),
(22, 'LEGRAND', 'A', '2020-07-14 08:55:12', '2020-07-14 08:55:12'),
(23, 'DIXON', 'E', '2020-07-19 03:41:03', '2020-07-19 03:44:41'),
(24, 'DIXON', 'A', '2020-07-19 03:41:03', '2020-07-19 03:41:03'),
(25, 'OEM', 'A', '2020-07-19 04:02:43', '2020-07-19 04:02:43'),
(26, 'NTWC', 'A', '2020-11-08 22:36:40', '2020-11-08 22:36:40'),
(27, 'TUNDRA', 'A', '2020-11-10 03:26:42', '2020-11-10 03:26:42'),
(28, 'FOSMON', 'A', '2020-11-12 02:47:37', '2020-11-12 02:47:37'),
(29, 'VENTION', 'A', '2020-11-12 02:55:25', '2020-11-12 02:55:25'),
(30, 'CISCO', 'A', '2020-11-22 06:10:48', '2020-11-22 06:11:01');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `migrations`
--

CREATE TABLE `migrations` (
  `id` int(10) UNSIGNED NOT NULL,
  `migration` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `batch` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(1, '2019_08_19_000000_create_failed_jobs_table', 1),
(2, '2020_05_26_233535_create_marca_table', 1),
(3, '2020_05_26_233851_create_modelo_table', 1),
(4, '2020_05_26_234037_create_unidad_medida_table', 1),
(5, '2020_05_26_234133_create_fabricante_table', 1),
(6, '2020_05_27_061253_create_producto_table', 1),
(7, '2020_06_05_231837_create_tipo_documento_table', 1),
(8, '2020_06_05_232204_create_cargo_table', 1),
(9, '2020_06_06_175129_create_users_table', 1),
(10, '2020_06_09_221954_create_tipo_cambio_table', 1),
(11, '2020_06_09_222249_create_registro_cambio_table', 1),
(12, '2020_06_10_215051_create_cliente_table', 1),
(13, '2020_06_15_150438_create_proveedor_table', 1),
(14, '2020_06_17_193112_create_cliente_contacto_table', 1),
(15, '2020_06_17_193420_create_cliente_direccion_table', 1),
(16, '2020_06_21_162938_create_proveeedor_direccion_table', 1),
(17, '2020_06_28_181309_create_proyecto_table', 1),
(18, '2020_07_06_075128_create_proveedor_banco_table', 1),
(19, '2020_07_06_084605_create_proveedor_colaborador_table', 1),
(20, '2020_07_09_152842_create_empresa_table', 1),
(21, '2020_07_22_100830_create_solicitud_cotizacion_cliente_table', 1),
(22, '2020_07_22_102041_create_solicitud_cotizacion_cliente_det_table', 1),
(23, '2020_09_18_121954_create_seccion_pdfs_table', 1),
(24, '2020_09_27_144854_create_proforma_cliente_table', 1),
(25, '2020_09_27_150434_create_proforma_cliente_det_table', 1),
(26, '2020_10_11_205539_create_cotizacion_proveedor_table', 1),
(27, '2020_10_11_205607_create_cotizacion_proveedor_det_table', 1),
(28, '2020_10_22_105258_create_orden_compra_table', 1),
(29, '2020_10_22_111805_create_orden_compra_det_table', 1),
(30, '2020_10_27_205415_create_kardex_table', 1),
(31, '2020_12_02_172602_create_factura_detalles_table', 1),
(32, '2020_12_05_021151_leyenda_factura', 1),
(33, '2020_12_05_021506_guia_factura', 1),
(34, '2020_12_05_021648_create_documento_relacionado', 1),
(35, '2020_12_05_021934_create_guia_embebidao', 1),
(36, '2020_12_05_022055_create_sellers', 1),
(37, '2020_12_05_022152_create_direccion_entregas', 1),
(38, '2020_12_05_022948_create_decuentos', 1),
(39, '2020_12_05_023022_create_cargos', 1),
(40, '2020_12_05_225044_create_gasto_table', 1),
(41, '2020_12_06_134230_create_facturas_table', 1),
(42, '2020_12_07_203114_create_transportista', 1),
(43, '2020_12_07_203534_create_envio', 1),
(44, '2020_12_07_205853_create_table_guia_remision', 1),
(45, '2020_12_07_205935_create_guia_remision_det', 1),
(46, '2020_12_08_022013_create_anticipos', 1),
(47, '2020_12_08_130739_create_pagos', 1),
(48, '2020_12_08_171901_adding_column_in_factura_detalles', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `modelo`
--

CREATE TABLE `modelo` (
  `id_mod` bigint(20) UNSIGNED NOT NULL,
  `des_mod` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `est_reg` char(2) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `modelo`
--

INSERT INTO `modelo` (`id_mod`, `des_mod`, `est_reg`, `created_at`, `updated_at`) VALUES
(1, 'CMZ-00424UTP-6UA', 'A', '2020-06-08 20:31:43', '2020-06-23 21:56:51'),
(2, '209207', 'E', '2020-06-12 16:53:24', '2020-07-22 02:51:55'),
(3, '209208', 'E', '2020-06-12 16:54:15', '2020-07-22 02:51:51'),
(4, '455383', 'E', '2020-06-12 18:45:11', '2020-07-22 02:52:03'),
(5, 'MM10-NETC6-06', 'A', '2020-06-23 22:09:34', '2020-06-23 22:09:34'),
(6, '704110', 'E', '2020-06-26 00:07:43', '2020-07-22 02:52:17'),
(7, 'MM-10NETC6-03', 'A', '2020-06-26 00:08:05', '2020-06-26 00:08:05'),
(8, '960047', 'E', '2020-06-26 00:08:19', '2020-07-22 02:52:11'),
(9, '483364', 'E', '2020-06-26 00:08:37', '2020-07-22 02:52:22'),
(10, '498591', 'E', '2020-06-26 00:08:51', '2020-07-22 02:52:26'),
(11, '271501', 'E', '2020-06-26 00:09:08', '2020-07-22 02:52:31'),
(12, 'CMZ-00424PAN-C6-01', 'A', '2020-06-26 00:09:52', '2020-11-17 21:18:44'),
(13, '262260', 'E', '2020-06-26 00:10:06', '2020-07-22 02:52:36'),
(14, '262268', 'E', '2020-06-26 00:10:31', '2020-07-22 02:52:46'),
(15, '329291', 'E', '2020-06-26 00:32:57', '2020-07-22 02:52:51'),
(16, '149891', 'E', '2020-06-26 00:33:14', '2020-07-22 02:52:55'),
(17, '224234', 'E', '2020-06-26 00:33:33', '2020-07-22 02:53:00'),
(18, '354363', 'E', '2020-06-26 00:34:10', '2020-07-22 02:53:05'),
(19, '695517', 'A', '2020-06-26 00:34:43', '2020-06-26 00:34:43'),
(20, '545917', 'A', '2020-06-26 00:35:01', '2020-06-26 00:35:01'),
(21, '680444', 'A', '2020-06-26 00:35:17', '2020-06-26 00:35:17'),
(22, '325932', 'A', '2020-06-26 00:36:03', '2020-06-26 00:36:03'),
(23, '956066', 'A', '2020-06-26 00:38:40', '2020-06-26 00:38:40'),
(24, '265696', 'A', '2020-06-26 00:38:53', '2020-06-26 00:38:53'),
(25, '265136', 'A', '2020-06-26 00:39:13', '2020-06-26 00:39:13'),
(26, '265697', 'A', '2020-06-26 00:39:27', '2020-06-26 00:39:27'),
(27, '265137', 'A', '2020-06-26 00:40:25', '2020-06-26 00:40:25'),
(28, '372717', 'A', '2020-06-26 00:40:44', '2020-06-26 00:40:44'),
(29, 'DSX-80007', 'E', '2020-06-26 19:53:39', '2020-06-27 11:29:35'),
(30, 'DSX-8000 CableAnalyzer de 2GHZ con Wi-Fi', 'A', '2020-06-27 11:23:05', '2020-06-27 11:23:05'),
(31, 'DSX-PC6S', 'A', '2020-06-27 11:25:28', '2020-06-27 11:25:28'),
(32, 'DSX-PC6S', 'E', '2020-06-27 11:25:47', '2020-06-27 11:29:45'),
(33, 'DSX-PC6AS', 'A', '2020-06-27 11:28:34', '2020-06-27 11:28:34'),
(34, 'DSX-PC6', 'A', '2020-06-27 11:32:39', '2020-06-27 11:32:39'),
(35, 'DSX-PC6A', 'A', '2020-06-27 11:37:25', '2020-06-27 11:37:25'),
(36, 'VERSIV HARDDSIDED', 'A', '2020-06-27 11:55:39', '2020-06-27 11:55:39'),
(37, 'VERSIV-STND', 'A', '2020-06-27 12:01:06', '2020-06-27 12:01:06'),
(38, 'BACKPACK STRAP FOR VERSIV', 'A', '2020-06-27 12:10:13', '2020-06-27 12:10:13'),
(39, 'CMZ-00424PAN-C6-01', 'A', '2020-06-27 12:12:33', '2020-06-27 12:12:33'),
(40, 'HARD DRIVE DE 4TB IS A 3.5 INCH', 'A', '2020-07-07 16:39:21', '2020-07-07 16:39:21'),
(41, 'PATCH PANEL RAIL DIN 8 PORTS COOPER', 'A', '2020-07-07 16:41:55', '2020-07-19 03:21:12'),
(42, 'ORDENADOR CABLE 2RU FRONTAL/POSTERIOR', 'A', '2020-07-07 16:46:11', '2020-07-19 03:11:27'),
(43, 'PATCH CORD CAT6 LSZH 3 MT BLUE', 'A', '2020-07-08 13:25:14', '2020-07-22 01:29:30'),
(44, 'JACK CAT 6 BLUE', 'A', '2020-07-08 13:32:46', '2020-07-08 13:32:46'),
(45, 'FACE PLATE DOS PUERTOS ANGULAR 45°', 'A', '2020-07-08 19:49:11', '2020-07-08 19:49:11'),
(46, 'CAJA ADOSABLE COLOR BALNCO', 'A', '2020-07-08 19:55:13', '2020-07-08 19:55:13'),
(47, 'PATCH PANEL 24 PUERTOS', 'A', '2020-07-08 20:00:07', '2020-07-08 20:00:07'),
(48, 'PIGTAL LC MULTIMODE OM3 SIMPLEX 1MT', 'A', '2020-07-08 20:04:38', '2020-07-08 20:04:38'),
(49, 'PATCH CORD MULTIMODO OM3 LC 2MT', 'A', '2020-07-08 20:08:40', '2020-07-19 03:55:20'),
(50, 'ACOPLADOR DUPLEX LC OM3 AQUA', 'A', '2020-07-08 20:12:54', '2020-07-19 03:58:01'),
(51, 'ACOPLADOR DUPLEX SC', 'A', '2020-07-08 20:15:12', '2020-07-08 20:15:12'),
(52, 'CASSETE DE ETIQUETAS PARA CABLE 200 ETQ', 'A', '2020-07-08 20:20:24', '2020-07-08 20:20:24'),
(53, 'ORDENADOR DE CABLE HORIZONTA DE 1RU FRONTAL', 'A', '2020-07-08 20:23:26', '2020-07-08 20:23:26'),
(54, 'ARNES DE SEGURIDAD CON LINEA DE VIDA', 'A', '2020-07-14 08:21:15', '2020-07-14 08:21:15'),
(55, 'CABLE BUNDLE ORGANIZING TOOL', 'A', '2020-07-14 08:28:36', '2020-07-14 08:28:36'),
(56, 'PANZONE BEND RADIUS 4\" POST', 'A', '2020-07-14 08:31:27', '2020-07-14 08:31:27'),
(57, 'WATER RESISTANT FACEPLATE WITH GRAY BASE', 'A', '2020-07-14 08:37:42', '2020-07-14 08:37:42'),
(58, 'MOUNTING AXIS MIDSPAN DIN CLIP A', 'A', '2020-07-14 08:42:22', '2020-07-14 08:42:22'),
(59, 'BTRCC 6/20', 'A', '2020-07-14 08:52:21', '2020-07-14 08:52:21'),
(60, 'CM30EZ', 'A', '2020-07-14 08:53:55', '2020-07-14 08:53:55'),
(61, 'CE25EZ', 'A', '2020-07-14 08:55:49', '2020-07-14 08:55:49'),
(62, '1 1/2 IN PAN-WRAP TOOL', 'A', '2020-07-14 09:07:43', '2020-07-14 09:07:43'),
(63, '3/4IN PAN-WRAP TOOL', 'A', '2020-07-14 09:14:27', '2020-07-14 09:14:27'),
(64, '1/2IN PAN-WRAP TOOL', 'A', '2020-07-14 09:16:31', '2020-07-14 09:16:31'),
(65, 'DEPTH FINGERS KIT FOR 42U/45U GABINETS', 'A', '2020-07-14 09:21:10', '2020-07-14 09:21:10'),
(66, 'HDMI 1.4 TYPE A FEMALE TO FEMALE', 'A', '2020-07-14 09:24:25', '2020-07-14 09:24:25'),
(67, '2 POSITION SLOPED SHUTTERED 1/2 INSERT', 'A', '2020-07-14 09:31:22', '2020-07-14 09:31:22'),
(68, 'FACEPLATE SINGLE GANG', 'A', '2020-07-14 09:33:41', '2020-07-14 09:33:41'),
(69, 'ULTIMATE ID PHONE ICON', 'A', '2020-07-14 09:40:03', '2020-07-14 09:40:03'),
(70, 'ULTIMATE ID DATA ICON', 'A', '2020-07-14 09:42:56', '2020-07-14 09:42:56'),
(71, '2 POSITION 1/2 FLAT INSERT', 'A', '2020-07-14 09:45:28', '2020-07-14 09:45:28'),
(72, '2 POSITION 1/3 FLAT INSERT', 'A', '2020-07-14 09:50:57', '2020-07-14 09:50:57'),
(73, 'MODULO CON EMPALME TIPO F', 'A', '2020-07-15 12:05:06', '2020-07-15 12:05:06'),
(74, 'P1 LABEL CASSETTE', 'A', '2020-07-15 12:31:59', '2020-07-15 12:31:59'),
(75, 'CASSETE DE ETIQUETAS PARA FACE PLATE  45°', 'A', '2020-07-15 12:50:13', '2020-07-15 14:07:39'),
(76, 'CASSETE PARA PACH PANEL 4P PVC', 'A', '2020-07-15 14:04:45', '2020-07-15 14:08:05'),
(77, 'TAPA CIEGA COLOR PLOMO', 'A', '2020-07-15 14:14:51', '2020-07-15 14:14:51'),
(78, 'TAPA CIEGA PARA PATCH PANEL NEGRO', 'A', '2020-07-15 14:17:55', '2020-07-15 14:17:55'),
(79, 'TAPA CIEGA PARA FACE PLATE COLOR BLANCO', 'A', '2020-07-15 14:22:14', '2020-07-15 14:24:15'),
(80, 'PLUG RJ-45 SHIELD ED T.CAMPO', 'A', '2020-07-15 14:36:02', '2020-07-15 14:36:02'),
(81, 'PLUG T. CAMPO CAT6', 'A', '2020-07-15 14:39:51', '2020-07-15 14:39:51'),
(82, 'HERRAMIENTA PARA JACK CAT6A', 'A', '2020-07-15 14:44:54', '2020-07-15 14:44:54'),
(83, 'JACK CAT 6A AZUL SHIELDED', 'A', '2020-07-15 14:48:46', '2020-07-15 14:48:46'),
(84, 'PELADOR DE CABLE UTP CAT 5, CAT6, CAT6A, CAT8', 'A', '2020-07-15 14:51:35', '2020-07-15 14:51:35'),
(85, 'ALICATE DE CORTE CABLE UTP', 'A', '2020-07-15 14:55:33', '2020-07-15 14:55:33'),
(86, 'HERRAMIENTA DE TERMINACION TG', 'A', '2020-07-15 14:57:57', '2020-07-15 14:57:57'),
(87, 'HERRAMIENTA DE TERMINACION NETKEY', 'A', '2020-07-15 15:01:38', '2020-07-15 15:01:38'),
(88, 'HERRAMIENTA DE TERMINACION FRAME', 'A', '2020-07-15 15:03:25', '2020-07-15 15:03:25'),
(89, 'HERRAMIENTA DE TERMINACION JACK CAT6', 'A', '2020-07-15 15:05:40', '2020-07-15 15:05:40'),
(90, 'HERRAMIENTA DE TERMINACION  DE PLUG RJ-45  TX6A', 'A', '2020-07-15 15:15:55', '2020-07-15 15:15:55'),
(91, 'JACK CAT6 RED', 'A', '2020-07-19 03:30:59', '2020-07-19 03:30:59'),
(92, 'JACK CAT5E WHITE', 'A', '2020-07-19 03:35:08', '2020-07-19 03:35:08'),
(93, 'JACK CAT5E NETKEY', 'A', '2020-07-19 03:39:02', '2020-07-19 03:39:02'),
(94, 'JACK CAT6 BLUE', 'A', '2020-07-19 03:43:38', '2020-07-19 03:43:38'),
(95, 'MULTIMODE OM3 LC TO LC FO', 'A', '2020-07-19 04:05:04', '2020-07-19 04:05:04'),
(96, 'PIGTAIL MONOMODE LC 1MT WHITE', 'A', '2020-07-19 04:11:08', '2020-07-19 04:11:08'),
(97, 'OPTICAM CONECTOR PREPULIDO LC 50/125', 'A', '2020-07-19 04:15:12', '2020-07-19 04:15:12'),
(98, 'CONNECTOR PREPULIDO LC MONOMODO', 'A', '2020-07-19 04:19:39', '2020-07-19 04:19:39'),
(99, 'FIBER OPTICAM CONNECTOR SC2', 'A', '2020-07-19 04:29:51', '2020-07-19 04:29:51'),
(100, 'CONNECTOR MULTIMODE OPTIC SIMPLEX', 'A', '2020-07-19 04:35:04', '2020-07-19 04:35:04'),
(101, 'PATCHCORD CAT6 AZUL 7 FT 2.13M', 'A', '2020-07-22 00:58:27', '2020-07-22 00:58:27'),
(102, 'PATCHCORD CAT6 10 FT 3.05M', 'A', '2020-07-22 01:04:30', '2020-07-22 01:04:30'),
(103, 'PATCH CORD CAT6 0.9 3FT', 'A', '2020-07-22 01:07:35', '2020-07-22 01:07:35'),
(104, 'PATCHCORD CAT6A SHIELDED LSZH BLUE 1MT', 'A', '2020-07-22 01:11:00', '2020-07-22 01:11:00'),
(105, 'PATCHCORD CAT6A 1MT LSZH COLOR GRAY INT.', 'A', '2020-07-22 01:15:46', '2020-07-22 01:15:46'),
(106, 'PATCHCORD CAT6A SOLIDO 1MT OFFWHITE', 'A', '2020-07-22 01:22:47', '2020-07-22 01:22:47'),
(107, 'PATCHCORD CAT6 1MT COLOR AZUL', 'A', '2020-07-22 01:32:07', '2020-07-22 01:32:07'),
(108, 'RACEWAY JUNCTION BOX COLOR WHITE', 'A', '2020-07-22 01:38:33', '2020-07-22 01:38:33'),
(109, 'CABLE UTP CAT6 LSZH COLOR BLANCO', 'A', '2020-07-22 02:07:20', '2020-07-22 02:07:20'),
(110, 'JACK CAT6 SL 110 COLOR BLUE', 'A', '2020-07-22 02:40:11', '2020-07-22 02:40:11'),
(111, 'JACK CAT6 SL 110 COLOR NEGRO', 'A', '2020-07-22 02:45:15', '2020-07-22 02:45:15'),
(112, 'JACK CAT6 SL 110 COLOR ROJO', 'A', '2020-07-22 02:51:10', '2020-07-22 02:51:10'),
(113, 'FACEPLATE 2 PUERTOS SIMPLE COLOR BLANCO', 'A', '2020-07-22 03:03:07', '2020-07-22 03:03:07'),
(114, 'PATCH CORD CAT6 AMP AZUL 10FT', 'A', '2020-07-22 03:16:18', '2020-07-22 03:16:18'),
(115, 'PATCH CORD CAT6 AMP ROJO 10FT', 'A', '2020-07-22 07:22:31', '2020-07-22 07:22:31'),
(116, 'PATCHCORD CAT6 AMP ROJO 3FT', 'A', '2020-07-22 07:30:54', '2020-07-22 07:30:54'),
(117, 'PATCHCORD CAT6 AMP AZUL 3FT', 'A', '2020-07-22 07:32:33', '2020-07-22 07:32:33'),
(118, 'TAPA CIEGA SL PARA FACEPLATE SIMPLE BLANCO AMP', 'A', '2020-07-22 07:45:37', '2020-07-22 07:45:37'),
(119, 'AXIS Q6215-LE', 'A', '2020-08-14 06:35:47', '2020-08-14 06:35:47'),
(120, 'AXIS Q6155-E', 'A', '2020-08-14 06:43:20', '2020-08-14 06:43:20'),
(121, 'S1148 24TB', 'A', '2020-08-21 08:23:28', '2020-08-21 08:23:28'),
(122, 'R100X150V1C', 'A', '2020-09-13 08:24:39', '2020-09-13 08:24:39'),
(123, 'ADAPTER', 'A', '2020-11-08 16:38:41', '2020-11-08 16:38:41'),
(124, 'DP/N 00FKKK', 'A', '2020-11-08 16:44:48', '2020-11-08 16:44:48'),
(125, 'DP - HDMI', 'A', '2020-11-08 16:48:33', '2020-11-08 16:48:33'),
(126, 'ITA2 20KVA', 'A', '2020-11-08 22:37:20', '2020-11-08 22:37:20'),
(127, '24 RU', 'A', '2020-11-10 03:27:05', '2020-11-10 03:27:05'),
(128, '24 RU PISO', 'A', '2020-11-10 04:40:21', '2020-11-10 04:40:21'),
(129, 'XTC331', 'A', '2020-11-12 02:48:38', '2020-11-12 02:48:38'),
(130, '4K', 'A', '2020-11-12 02:55:42', '2020-11-12 02:55:42'),
(131, '55\" A 60\"', 'A', '2020-11-12 03:01:18', '2020-11-12 03:01:18'),
(132, 'STP6X2MBU', 'A', '2020-11-21 04:52:13', '2020-11-21 04:52:13'),
(133, 'STP6X3MBU', 'A', '2020-11-21 05:06:51', '2020-11-21 05:06:51'),
(134, 'P1435-E', 'A', '2020-11-22 05:27:24', '2020-11-22 05:27:24'),
(135, 'AXIS NETWORK CAMARA Q1798-L', 'A', '2020-11-22 05:32:19', '2020-11-22 05:32:19'),
(136, 'MONTAJE EN POSTE AXIS T91BB47', 'A', '2020-11-22 05:57:05', '2020-11-22 05:57:05'),
(137, 'MONTAJE EN POSTE AXIS T91B47', 'A', '2020-11-22 06:03:05', '2020-11-22 06:05:18'),
(138, 'SG-350-10P', 'A', '2020-11-22 06:37:29', '2020-11-22 06:37:29');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `orden_compra`
--

CREATE TABLE `orden_compra` (
  `id_ord_com` bigint(20) UNSIGNED NOT NULL,
  `ord_com_cod` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL,
  `cotprov_id` bigint(20) UNSIGNED DEFAULT NULL,
  `ord_com_prov_id` int(11) DEFAULT NULL,
  `ord_com_prov_dir` varchar(200) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `ord_com_prov_con` varchar(200) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `ord_com_prov_ema` varchar(200) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `ord_com_term` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `id_emp` bigint(20) UNSIGNED DEFAULT NULL,
  `ord_com_fec` datetime DEFAULT NULL,
  `id_col` bigint(20) UNSIGNED DEFAULT NULL,
  `ord_com_bas_imp` double(8,2) DEFAULT NULL,
  `ord_com_igv` double(8,2) DEFAULT NULL,
  `ord_com_tot` double(8,2) DEFAULT NULL,
  `id_pro` bigint(20) UNSIGNED DEFAULT NULL,
  `ord_com_est` char(1) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `est_env` char(1) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `est_reg` char(2) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `id_cli` bigint(20) UNSIGNED DEFAULT NULL,
  `ord_com_tip` char(1) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `ord_med_ent` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `orden_compra`
--

INSERT INTO `orden_compra` (`id_ord_com`, `ord_com_cod`, `cotprov_id`, `ord_com_prov_id`, `ord_com_prov_dir`, `ord_com_prov_con`, `ord_com_prov_ema`, `ord_com_term`, `id_emp`, `ord_com_fec`, `id_col`, `ord_com_bas_imp`, `ord_com_igv`, `ord_com_tot`, `id_pro`, `ord_com_est`, `est_env`, `est_reg`, `created_at`, `updated_at`, `id_cli`, `ord_com_tip`, `ord_med_ent`) VALUES
(1, '0001-NTWC-2020', 2, 3, 'Av. Circunvalación Nº595 Urb. San Ignacio de Loyola Santiago de Surco', 'Flor de Maria Cojal Tolentino', 'fcojal@mafortservice.com', 'Credito 30 Dias', 1, '2020-11-08 12:23:51', 1, 3750.00, 675.00, 4425.00, NULL, '0', '0', 'AN', '2020-11-08 22:23:51', '2020-11-08 22:24:22', NULL, '1', NULL),
(2, '0002-NTWC-2020', 2, 3, 'Av. Circunvalación Nº595 Urb. San Ignacio de Loyola Santiago de Surco', 'Flor de Maria Cojal Tolentino', 'fcojal@mafortservice.com', 'Credito 30 Dias', 1, '2020-11-08 12:23:52', 2, 3750.00, 675.00, 4425.00, NULL, '0', '0', 'AN', '2020-11-08 22:23:52', '2020-11-08 22:32:58', NULL, '1', NULL),
(3, '0003-NTWC-2020', 2, 3, 'Av. Circunvalación Nº595 Urb. San Ignacio de Loyola Santiago de Surco', 'Flor de Maria Cojal Tolentino', 'fcojal@mafortservice.com', 'Credito 30 Dias', 1, '2020-11-08 12:38:37', 2, 3750.00, 675.00, 4425.00, NULL, '0', '0', 'AN', '2020-11-08 22:38:37', '2020-11-08 22:39:06', NULL, '1', NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `orden_compra_det`
--

CREATE TABLE `orden_compra_det` (
  `id_ord_det` bigint(20) UNSIGNED NOT NULL,
  `id_ord_com` bigint(20) UNSIGNED DEFAULT NULL,
  `id_prod` bigint(20) UNSIGNED DEFAULT NULL,
  `ord_com_det_numpar` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `ord_com_det_fab` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `ord_com_det_des` varchar(2000) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `ord_com_det_can` double(8,2) DEFAULT NULL,
  `ord_com_det_unimed` char(10) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `ord_com_det_preuni` double(8,2) DEFAULT NULL,
  `ord_com_det_est` char(2) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `ord_com_det_feclleg` datetime DEFAULT NULL,
  `ord_com_det_canent` double(8,2) DEFAULT NULL,
  `ord_com_det_canfal` double(8,2) DEFAULT NULL,
  `ord_com_prod_serv` char(1) COLLATE utf8mb4_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `orden_compra_det`
--

INSERT INTO `orden_compra_det` (`id_ord_det`, `id_ord_com`, `id_prod`, `ord_com_det_numpar`, `ord_com_det_fab`, `ord_com_det_des`, `ord_com_det_can`, `ord_com_det_unimed`, `ord_com_det_preuni`, `ord_com_det_est`, `ord_com_det_feclleg`, `ord_com_det_canent`, `ord_com_det_canfal`, `ord_com_prod_serv`) VALUES
(1, 1, 96, 'MANTOUPSTRIF', NULL, 'Servicio de Mantenimiento Preventivo de UPS Trifásico  Potencia 40 KVA  MODELO ITA 2  MARCA LIBERTY - VERTIV', 1.00, NULL, 3750.00, '0', NULL, 0.00, 1.00, NULL),
(2, 2, 96, 'MANTOUPSTRIF', NULL, 'Servicio de Mantenimiento Preventivo de UPS Trifásico  Potencia 40 KVA  MODELO ITA 2  MARCA LIBERTY - VERTIV', 1.00, NULL, 3750.00, '0', NULL, 0.00, 1.00, NULL),
(3, 3, 96, 'MTTOTRF001', NULL, 'Servicio de Mantenimiento Preventivo de UPS Trifásico  Potencia 40 KVA  MODELO ITA 2  MARCA LIBERTY - VERTIV', 1.00, NULL, 3750.00, '0', NULL, 0.00, 1.00, NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pagos`
--

CREATE TABLE `pagos` (
  `id_pagos` bigint(20) UNSIGNED NOT NULL,
  `id_factura` bigint(20) UNSIGNED DEFAULT NULL,
  `medio_pago` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `fechaPago` datetime DEFAULT NULL,
  `monto` double(8,2) DEFAULT NULL,
  `referencia` varchar(200) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `est_reg` char(2) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `producto`
--

CREATE TABLE `producto` (
  `id_prod` bigint(20) UNSIGNED NOT NULL,
  `cod_prod` char(20) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `num_parte_prod` char(20) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `stk_prod` double(8,2) DEFAULT 0.00,
  `des_prod` varchar(2000) COLLATE utf8mb4_unicode_ci NOT NULL,
  `pre_com_prod` double(8,2) DEFAULT NULL,
  `mon_prod` int(11) DEFAULT NULL,
  `id_unimed` bigint(20) UNSIGNED DEFAULT NULL,
  `id_mar` bigint(20) UNSIGNED DEFAULT NULL,
  `id_mod` bigint(20) UNSIGNED DEFAULT NULL,
  `id_fab` bigint(20) UNSIGNED DEFAULT NULL,
  `est_reg` char(2) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `producto`
--

INSERT INTO `producto` (`id_prod`, `cod_prod`, `num_parte_prod`, `stk_prod`, `des_prod`, `pre_com_prod`, `mon_prod`, `id_unimed`, `id_mar`, `id_mod`, `id_fab`, `est_reg`, `created_at`, `updated_at`) VALUES
(1, 'pr001', '1', 2.00, 'Producto 1', 2.56, NULL, 5, 2, 1, 4, 'E', '2020-06-08 20:32:28', '2020-06-23 22:23:01'),
(2, '5', 'CMZ-00424UTP-6UA', 3.00, 'CABLE U/UTP LSZH CAT6 23AWG 1000 FT(305M) COLOR BLANCO', 120.00, NULL, 1, 5, 1, 1, 'E', '2020-06-12 18:43:30', '2020-06-23 22:23:09'),
(3, NULL, '5', 10.00, 'Tuberia tipo conduit', 12.00, NULL, 2, 5, 1, 3, 'E', '2020-06-20 01:19:25', '2020-06-20 01:21:40'),
(4, NULL, '5', 10.00, 'PATCH CORD', 15.00, NULL, 2, 5, 2, 3, 'E', '2020-06-20 01:23:48', '2020-06-23 22:23:14'),
(5, 'CMZ-00424UTP-6U', '1427070-2', 735.00, 'CABLE CAT6 4P UTP 24AWG LSZH WT (305M) COLOR WHITE', 0.38, 2, 13, 16, 109, 6, 'A', '2020-06-25 22:36:14', '2020-11-17 21:02:27'),
(6, '209207', '1375055-6', 11.00, 'MODULO CONECTOR SERIE SL CAT6 U/UTP, COLOR AZUL', 3.33, 2, 8, 16, 110, 6, 'A', '2020-06-26 00:05:24', '2020-09-13 00:40:15'),
(7, '209208', '1375055-7', 4.00, 'MODULO CONECTOR SERIE SL CAT6 U/UTP, COLOR ROJO', 3.33, 2, 8, 16, 112, 6, 'A', '2020-06-26 00:45:17', '2020-09-13 00:40:24'),
(8, '455383', '1859247-3', 11.00, 'CABLE DE PACHEO CAT6 U/UTP NO-PLENUM CM, COLOR AZUL 3FT', 2.61, 2, 8, 16, 117, 6, 'A', '2020-06-26 00:47:54', '2020-09-13 00:30:01'),
(9, 'MM10-NETC6-06', 'NPC06UVDB-BL010F', 11.00, 'CABLE DE PACHEO CAT6 U/UTP NO-PLENUM CM, COLOR AZUL 10 PIES', 3.43, 2, 8, 16, 114, 6, 'A', '2020-06-26 00:50:00', '2020-09-13 00:44:58'),
(10, 'NTWC-0001', 'DSX2-8000', 1.00, 'ANALIZADOR DE CABLE SERIE DSX', 45500.00, 1, 8, 8, 30, 24, 'A', '2020-06-26 19:54:07', '2020-07-22 02:00:46'),
(11, NULL, 'DSX-PC6S', 0.00, 'ADAPTADOR DE PATCH CORD CAT6 (PAR)', 4973.00, NULL, 8, 8, 31, 24, 'A', '2020-06-27 11:26:51', '2020-06-27 11:26:51'),
(12, NULL, 'DSX-PC6AS', 0.00, 'ADAPTADOR DE PATCH CORD PARA CAT6A (PAR)', 5881.00, NULL, 8, 8, 33, 24, 'A', '2020-06-27 11:29:10', '2020-06-27 11:30:51'),
(13, NULL, 'DSX-PC6', 0.00, 'ADAPTADOR DE PATCH CORD PARA CAT6 (UNIDAD)', 3522.89, NULL, 8, 8, 34, 24, 'A', '2020-06-27 11:33:09', '2020-09-13 00:24:44'),
(14, NULL, 'DSX-PC6A', 0.00, 'ADAPTADOR DE PATCH CORD PARA CAT6A (UNIDAD)', 3531.15, NULL, 8, 8, 35, 24, 'A', '2020-06-27 11:37:41', '2020-06-27 11:37:41'),
(15, NULL, 'VERSIV-CASE3', 0.00, 'VERSIV HARDDSIDED CASE', 4889.92, NULL, 8, 8, 36, 24, 'A', '2020-06-27 11:56:07', '2020-06-27 11:56:07'),
(16, NULL, 'VERSIV-STND', 0.00, 'VERSIV DEMO STAND', 329.57, NULL, 8, 8, 37, 24, 'A', '2020-06-27 12:01:30', '2020-06-27 12:01:30'),
(17, NULL, 'VERSIV-BACKPKSTRP', 0.00, 'BACKPACK STRAP FOR VERSIV LARGE', NULL, NULL, 8, 8, 38, 24, 'A', '2020-06-27 12:10:34', '2020-06-27 12:10:34'),
(18, NULL, 'PUZ6004WH-CEG', 2.00, 'CABLE DE COBRE CATEGORIA 6 4P 23 AWF NO BLINDADO LSZH-3 BLANCO 305M', NULL, NULL, 13, 5, 1, 11, 'A', '2020-06-27 12:14:08', '2020-06-27 12:14:08'),
(19, NULL, '01858-001', 2.00, 'SURVEILLANCE DRIVE 4TB IS 3.5INCH INTERNAL DRIVE DESIGNED', 0.00, NULL, 8, 19, 40, 9, 'A', '2020-07-07 16:40:13', '2020-07-07 16:40:13'),
(20, NULL, 'CDPP8RG', 1.00, 'DIN RAIL MNT CU PANEL INDUSTRIALNET', 68.00, 2, 8, 5, 41, 11, 'A', '2020-07-07 16:42:25', '2020-07-19 03:18:10'),
(21, NULL, 'WMPH2E', 1.00, 'CABLE MGMT DUCT HORIZONTAL 3.5HX20WX9D EXTD COVER-2 CLIPS BLACK, 2RMU ROHS', 42.48, 2, 8, 5, 42, 11, 'A', '2020-07-07 16:46:49', '2020-07-19 03:09:51'),
(22, NULL, 'UTPSPL3MBUY', 10.00, 'TX6 PLUS CAT6 UTP PATCHCORD T568B LSZH 24AWG STRANDED COLOR BLUE 3MT 9.84FT', 7.08, 2, 8, 5, 43, 11, 'A', '2020-07-08 13:25:45', '2020-07-22 01:28:53'),
(23, NULL, 'CJ688TPBU', 10.00, '1 PORT MOD JACK IDC 8W8P UTP T568A/B CAT6 TX PLUS MINICOM BLUE ROHS', 5.31, 2, 8, 5, 44, 11, 'A', '2020-07-08 13:33:38', '2020-07-19 03:27:55'),
(24, NULL, 'UICFPHSE2IW', 16.00, 'DUAL FACE PLATE FOR MINICOM JACK SLOPED INTL WHITE ROHS', 1.58, 2, 8, 5, 45, 11, 'A', '2020-07-08 19:49:37', '2020-09-01 08:22:06'),
(25, NULL, 'JBX3510IW-A', 30.00, 'SINGLE GANG JUNCTION BOX FOR USE WITH PAN-WAY T45 OR LD PROFILE RACEWAY', 4.00, 2, 8, 5, 108, 11, 'A', '2020-07-08 19:55:17', '2020-07-22 01:39:50'),
(26, NULL, 'CPPL24WBLY', 1.00, '24-PORT PANLE UNLOADED SNAP-IN 4 POR FACEPLATE BLK WITH LABELS ROHS', 17.70, 2, 8, 5, 47, 11, 'A', '2020-07-08 20:00:12', '2020-07-19 03:25:43'),
(27, NULL, 'FX1BN1NNNSNM001', 8.00, 'OM3, MULTIMODE PATCH CORD 1 FIBER SIMPLEX LC TO PIGTAIL-STD IL 900um BUFFERED', 7.08, 2, 8, 5, 48, 11, 'A', '2020-07-08 20:04:53', '2020-07-19 03:56:02'),
(28, NULL, 'FX2ERLNLNSNM002', 4.00, 'OM3 2-F 1.6MM PATCH CORD RISER LC DUPLEX AQUA 2M', 21.24, 2, 8, 5, 49, 11, 'A', '2020-07-08 20:09:17', '2020-07-19 03:56:12'),
(29, NULL, 'CMDSAQLCZBL', 2.00, 'LC 10GIG DUPLEX MM ADPTR NOD ZIRCONIA CERAMIC SPLIT SLEEVES AQUA SR/SR', 12.98, 2, 8, 5, 50, 11, 'A', '2020-07-08 20:13:10', '2020-07-19 03:57:37'),
(30, NULL, 'CMDBUSCZBL', 1.00, 'SC DUPL (BU) ADAPTER (BL) MODULE ASSY (ZIRC)', 11.80, 2, 8, 5, 51, 11, 'A', '2020-07-08 20:15:39', '2020-07-19 03:59:23'),
(31, NULL, 'S100X150VAC', 4.00, 'P1 CASSETTE SELF-LAM LABLE VINYL 1.00\" Wx1.50\"L x 0.5\" 200 Labels', 0.00, NULL, 8, 5, 52, 11, 'A', '2020-07-08 20:20:36', '2020-07-15 12:39:37'),
(32, NULL, 'WMPFSE', 1.00, 'CABLE MANAGER HORIZONTAL 1.7\"H x 19\"W x 3.7\"D 1RMU BLK FRONT ONLY ROHS', 35.40, 2, 8, 5, 53, 11, 'A', '2020-07-08 20:23:53', '2020-07-19 03:14:09'),
(33, NULL, '3M 1340180', 3.00, 'ARNES - LINEA DE VIDA', NULL, NULL, 8, 20, 54, 26, 'A', '2020-07-14 08:22:31', '2020-07-14 08:22:31'),
(34, NULL, 'CBOT24K', 6.00, 'ORGANIZADOR DE CABLE', NULL, NULL, 8, 5, 55, 11, 'A', '2020-07-14 08:28:57', '2020-07-14 08:28:57'),
(35, NULL, 'PZBR4', 8.00, 'DEDOS PARA GABINETE DE PARED', NULL, NULL, 8, 5, 56, 11, 'A', '2020-07-14 08:31:46', '2020-07-14 08:31:46'),
(36, NULL, 'CFPWR4CIG', 5.00, 'FACEPLATE RESISTENTE AL AGUA', NULL, NULL, NULL, 5, 57, 11, 'A', '2020-07-14 08:38:01', '2020-07-14 08:38:01'),
(37, NULL, '5503-931', 9.00, 'RIEL DIN DE MONTAJE MIDSPAN AXIS', NULL, NULL, 8, 19, 58, 9, 'A', '2020-07-14 08:42:43', '2020-07-14 08:42:43'),
(38, NULL, 'CM801011', 80.00, 'TORNILLO CON TUERCA', NULL, NULL, 8, 21, 59, 7, 'A', '2020-07-14 08:52:56', '2020-07-14 08:52:56'),
(39, NULL, 'CM558041', 70.00, 'MORDAZA GRANDE', NULL, NULL, 8, 21, NULL, 27, 'A', '2020-07-14 08:54:03', '2020-07-14 08:58:20'),
(40, NULL, 'CM558011', 62.00, 'MORDAZA PEQUEÑA', NULL, NULL, NULL, 22, 61, 28, 'A', '2020-07-14 08:56:11', '2020-07-14 08:59:54'),
(41, NULL, 'PWT150', 1.00, 'ORDENADOR DE CABLE ESPIRAL', NULL, NULL, 8, 5, 62, 11, 'A', '2020-07-14 09:07:57', '2020-07-14 09:07:57'),
(42, NULL, 'PWT100', 1.00, 'ORDENADOR DE CABLE ESPIRAL', NULL, NULL, 8, 5, 63, 11, 'A', '2020-07-14 09:14:43', '2020-07-14 09:14:43'),
(43, NULL, 'PWT50', 1.00, 'ORDENADOR DE CABLE ESPIRAL', NULL, NULL, 8, 5, 64, 11, 'A', '2020-07-14 09:16:55', '2020-07-14 09:16:55'),
(44, NULL, 'SN25F', 1.00, 'DEPTH FINGERS KIT FOR 42U/45U GABINETS', NULL, NULL, 17, 5, 65, 11, 'A', '2020-07-14 09:21:23', '2020-07-14 09:21:23'),
(45, NULL, 'CMHDMIIW', 4.00, 'ADAPTADOR HDMI', NULL, NULL, 8, 5, 66, 11, 'A', '2020-07-14 09:24:58', '2020-07-14 09:24:58'),
(46, NULL, 'CHS2SIW-X', 10.00, 'ACCESORIO PARA DOS MODULOS INCLINADOS', NULL, NULL, 8, 5, 67, 11, 'A', '2020-07-14 09:31:44', '2020-07-14 09:31:44'),
(47, NULL, 'CBEIWY', 1.00, 'MARCO MODULAR', NULL, NULL, 8, 5, 68, 11, 'A', '2020-07-14 09:34:05', '2020-07-14 09:34:05'),
(48, NULL, 'UICIPRD-C', 226.00, 'ICONO DE TELEFONO ROJO', NULL, NULL, NULL, 5, 69, 11, 'A', '2020-07-14 09:40:15', '2020-07-14 09:40:15'),
(49, NULL, 'UICIDBU-C', 193.00, 'ICONO DATA AZUL', NULL, NULL, 8, 5, 70, 11, 'A', '2020-07-14 09:43:26', '2020-07-14 09:43:26'),
(50, NULL, 'CHF2IW-X', 8.00, 'INSERCION PLANA PARA DOS MODULOS', NULL, NULL, 8, 5, 71, 11, 'A', '2020-07-14 09:48:25', '2020-07-14 09:48:25'),
(51, NULL, 'CHF2MIW-X', 7.00, 'INSERCION PLANA PARA DOS MODULOS', NULL, NULL, 8, 5, 72, 11, 'A', '2020-07-14 09:51:14', '2020-07-14 09:51:14'),
(52, NULL, 'CMFIW', 3.00, 'CONECTOR CABLE CATV BNC', NULL, NULL, 8, 5, 73, 11, 'A', '2020-07-15 12:05:47', '2020-07-15 12:05:47'),
(53, NULL, 'S100X150VAC', 4.00, 'CASSETTE ETIQUETA PARA CABLE', NULL, NULL, 8, 5, 74, 11, 'E', '2020-07-15 12:33:19', '2020-07-15 12:37:56'),
(54, '348476', 'C125X030FJC', 200.00, 'POLYOLEFIN COMP LABEL BLACK ON WHITE 200 LABELS 1.25\" x 0.30\" - 31.7mm x 7.6mm', 0.24, 2, 7, 5, 75, 11, 'A', '2020-07-15 12:51:12', '2020-09-13 08:11:36'),
(55, '348475', 'C261X035Y1C', 150.00, 'NA POLYESTER LABEL BLACK ON WHITE 75 LABELS 2.61\" x 0.35\" 66.3mm x 8.9mm', 0.61, 2, 8, 5, 76, 11, 'A', '2020-07-15 14:05:08', '2020-09-13 08:43:45'),
(56, NULL, 'CMBIG-X', 19.00, 'MINI-COM BLANK MODULE', NULL, NULL, 8, 5, 77, 11, 'A', '2020-07-15 14:15:14', '2020-07-15 14:15:14'),
(57, NULL, 'CMBIW-X', 14.00, 'MINI-COM BLANK MODULE', 1.50, 2, 8, 5, 79, 11, 'A', '2020-07-15 14:18:21', '2020-09-01 08:26:05'),
(58, NULL, 'CMBBL-X', 7.00, 'MINI-COM BLANK MODULE', NULL, NULL, 8, 5, 78, 11, 'A', '2020-07-15 14:22:19', '2020-07-15 14:25:08'),
(59, NULL, 'FPS6X88MTG', 7.00, 'FIELD TERMINABLE RJ-45 PLUG', NULL, NULL, 8, 5, 80, 11, 'A', '2020-07-15 14:36:11', '2020-07-15 14:36:11'),
(60, NULL, 'FP6X88MTG', 10.00, 'FIELD TERMINABLE R-45 PLUG CAT 6A AND 22AWG-26AWG', NULL, NULL, 8, 5, 81, 11, 'A', '2020-07-15 14:40:09', '2020-07-15 14:40:09'),
(61, NULL, 'EGJT-1', 2.00, 'ENHANCED GIGA-TX JACK TOOL FOR TG STYLE MODULAR JACKS', NULL, NULL, 8, 5, 82, 11, 'A', '2020-07-15 14:45:17', '2020-07-15 14:45:17'),
(62, NULL, 'CJS6X88TGY', 2.00, 'MINI-COM  TX6 10GIG SHIELDED JACK MODULE', NULL, NULL, 8, 5, 83, 11, 'A', '2020-07-15 14:49:03', '2020-07-15 14:49:03'),
(63, NULL, 'CJAST', 3.00, 'CABLE JACKET ADJUSTABLE STRIPPER', NULL, NULL, 8, 5, 84, 11, 'A', '2020-07-15 14:51:56', '2020-07-15 14:51:56'),
(64, NULL, 'CWST', 3.00, 'SNIPPING TOOL CUTS COPPER WIRE UP TO 14 AWG (1.66mm)', NULL, NULL, 8, 5, 85, 11, 'A', '2020-07-15 14:55:53', '2020-07-15 14:55:53'),
(65, NULL, 'TGJT D11', 1.00, 'TERMINATION TOOL CAT6 TG', NULL, NULL, 8, 5, 86, NULL, 'A', '2020-07-15 14:59:56', '2020-07-15 14:59:56'),
(66, NULL, 'NKSPB', 1.00, 'NETKEY PUNCHDOWN BASE', NULL, NULL, 8, 5, 87, 11, 'A', '2020-07-15 15:02:04', '2020-07-15 15:02:04'),
(67, NULL, 'CJT', 1.00, 'TERMINACION TOOL FOR LEAD FRAME MODULES', NULL, NULL, 8, 5, 88, 11, 'A', '2020-07-15 15:03:42', '2020-07-15 15:03:42'),
(68, NULL, 'CGJT', 2.00, 'CGJT TERMINATION TOLL JACK', NULL, NULL, 8, 5, 89, 11, 'A', '2020-07-15 15:06:03', '2020-07-15 15:06:03'),
(69, NULL, 'EGPT', 2.00, 'TERMINATION TOLL EGPT', NULL, NULL, 8, 5, 90, 11, 'A', '2020-07-15 15:16:14', '2020-07-15 15:16:14'),
(70, NULL, 'CJ688TPRD', 10.00, 'MINI-COM TX6 PLUS JACK MODULE T668A/B WIRING SCHEME RJ45', 5.31, 2, 8, 5, 91, 11, 'A', '2020-07-19 03:31:17', '2020-07-19 03:31:17'),
(71, NULL, 'CJ588IWY', 0.00, 'MINI-COM JACK CAT5E MODULE T568A/B WIRING RJ45 CATEGORY 5E', 5.31, 2, 8, 5, 92, 11, 'A', '2020-07-19 03:35:26', '2020-07-19 03:35:26'),
(72, NULL, 'NKP5E88MIW', 1.00, 'NETKEY CAT5E PUSHDOWN JACK USE NKSPB BASE WHITE TERMINATING', 5.31, 2, 8, 5, 93, 11, 'A', '2020-07-19 03:39:18', '2020-07-19 03:39:18'),
(73, NULL, 'KJ8-C6-US/BLN', 0.00, 'MODULO PUSH DOWN CAT6 BLUE', 4.50, 2, 8, 23, 94, 29, 'A', '2020-07-19 03:44:18', '2020-07-19 03:44:18'),
(74, NULL, '46E-101220182', 3.00, 'PATCH CORD MULTIMODO OM3 50/125 um LC DUPLEX 3MM X 7MT', 45.00, 2, 8, 25, 95, 30, 'A', '2020-07-19 04:05:51', '2020-07-19 04:05:51'),
(75, NULL, '17111701312195', 4.00, 'LC/UPC SINGLEMODEM FIBRE PIGTAIL TIGHT BUFFER-9/125 OS1/OS2 WHITE 900um 1MT', 14.00, 2, NULL, 25, 96, 30, 'A', '2020-07-19 04:11:21', '2020-07-19 04:11:21'),
(76, NULL, 'FLCSMCXAQY', 4.00, 'CONECTOR LC OPTICAM SIMPLEX MULTIMODE FO 900um BUFFER', 10.00, 2, 8, 5, 97, 11, 'A', '2020-07-19 04:17:04', '2020-07-19 04:17:04'),
(77, NULL, 'RFLCDSCBUY', 1.00, 'CONNECTOR LC OPTICAM 9/125 DUPLEX 900um BUFFER', 16.00, 2, 8, 5, 98, 11, 'A', '2020-07-19 04:20:09', '2020-07-19 04:20:09'),
(78, NULL, 'RFSC2SCBU', 2.00, 'CONNECTOR SC2 SIMPLEX SINGLEMODE OPTICAM OS1 900um BLUE BOOT', 16.00, 2, 8, 5, 99, 11, 'A', '2020-07-19 04:31:06', '2020-07-19 04:35:51'),
(79, NULL, 'FLCSMBLY', 2.00, 'CONNECTOR LC SIMPLEX MULTIMODE FO 900um 1.6MM-2.0MM', 16.00, 2, 8, 5, NULL, 11, 'A', '2020-07-19 04:35:23', '2020-07-19 04:35:23'),
(80, NULL, 'UTPSPTBUY', 2.00, 'TX6 PLUS CAT6 UTP PATCH CORD T568B CM 24AWG STRANDED COLOR BLUE', NULL, 2, 8, 5, 101, 11, 'A', '2020-07-22 00:58:56', '2020-07-22 00:58:56'),
(81, NULL, 'UTPSP10RDY', 2.00, 'TX PLUS CAT6 PATCHCORD TX568B CM 24WG STRANDED COLOR RED', NULL, 2, 8, 5, 102, NULL, 'A', '2020-07-22 01:05:21', '2020-07-22 01:05:21'),
(82, NULL, 'UTPSP3RDY', 1.00, 'TX6 PLUS CAT6 UTP PATCHCORD T568B CM 24WG STRANDED COLOR RED 3FT 0.91M', NULL, 2, 8, 5, 103, 11, 'A', '2020-07-22 01:07:57', '2020-07-22 01:07:57'),
(83, NULL, 'STP6X1MBU', 3.00, 'TX6A 10GIG SHIELDED SFTP PATCHCORD T568B LSZH/CM 26AWG STRANDED COLOR BLUE 1MT 3.28FT', NULL, 2, 8, 5, 104, 11, 'A', '2020-07-22 01:11:20', '2020-07-22 01:11:20'),
(84, NULL, 'STP6X3IG', 1.00, 'TX6 10GIG SHIELDED RJ45 PATCHCORD CAT6A/CLASS EA T568B 26AWG LSZH/CM COLO INT GRAY 3FT 0.91 MT', NULL, 2, 8, 5, 105, 11, 'A', '2020-07-22 01:16:51', '2020-07-22 01:16:51'),
(85, NULL, 'UTP28X3', 1.00, 'CAT6A PERFORMANCE UTP PATCHCORD T568B CM/LSZH 28WG SOLID COLOR OFF WHITE 3FT 0.91 MT', NULL, 2, 8, 5, 106, 11, 'A', '2020-07-22 01:23:13', '2020-07-22 01:23:13'),
(86, NULL, 'UTPSPL1MBUY', 10.00, 'TX6 PLUS CAT6 UTP PATCHCORD T568B LSZH 24AWG STRANDED COLOR BLUE 1MT 3.28FT', 5.08, 2, 8, 5, 107, 11, 'A', '2020-07-22 01:32:30', '2020-07-22 01:32:30'),
(87, NULL, '1375055-2', 1.00, 'MODULO CONECTOR SERIE SL CAT6 UUTP COLOR NEGRO', 3.93, 2, 8, 16, 111, 6, 'A', '2020-07-22 02:46:16', '2020-07-22 02:46:16'),
(88, '1192931', '1-2111009-3', 16.00, 'FACEPLATE SINGLE GANG 2 PORT ALPINE WHITE', 1.95, 2, 8, 16, 113, 6, 'A', '2020-07-22 03:04:00', '2020-09-13 00:50:49'),
(89, 'MM10-NETC6-03', 'NPC06UVDB-RD010F', 4.00, 'CABLE DE PACHEO CAT6 U/UTP NO-PLENUM CM, COLOR ROJO 10 PIES', 3.40, 2, 8, 16, 115, 6, 'A', '2020-07-22 07:27:14', '2020-09-13 00:45:30'),
(90, '704110', '1859249-3', 4.00, 'CABLE DE PACHEO CAT6 U/UTP NO-PLENUM CM, COLOR ROJO 3FT', 2.80, 2, 8, 16, 116, 6, 'A', '2020-07-22 07:37:28', '2020-09-13 00:35:06'),
(91, '483364', '1-1116412-3', 11.00, 'SL SERIES INSERT BLANK ALPINE WHITE', 0.26, 2, 8, 16, 118, 6, 'A', '2020-07-22 07:46:18', '2020-07-22 07:46:18'),
(92, '6215', 'Q6215-LE', 0.00, 'CAMARA PTZ DE GRAN RESISTENCA CON OPTIMIZEDIR', 3050.00, 2, 8, 19, 119, 9, 'A', '2020-08-14 06:37:51', '2020-08-14 06:44:33'),
(93, '6155', 'Q6155-E', 0.00, 'CAMARA DOMO COMPACTA DE ALTA VELOCIDAD', 1500.00, 1, 8, 19, 120, 9, 'A', '2020-08-14 06:44:10', '2020-08-14 06:44:10'),
(94, '01614-001', 'S1148', 0.00, 'AXIS-S1148 24TB, CAMARA STATION RECORDER, PRELOADED, 48CH LICENSE, 3YR WARRANTY', 10932.70, 2, 8, 19, 121, 9, 'A', '2020-08-21 08:24:02', '2020-08-30 09:14:17'),
(95, '424608', 'R100X150V1C', 300.00, 'TURN-TELL THERM TRANS LABELS CAT 5/5E/6 CABLE 1\" x 1.5\"x0.5\" WHITE 100/CASS ROHS', 0.34, 2, 7, 5, 122, 11, 'A', '2020-09-13 08:26:36', '2020-09-13 08:26:36'),
(96, 'MT001', 'MTTOTRF001', 1.00, 'Mantenimiento Preventivo de UPS Trifásico  Potencia 20 KVA  MODELO ITA 2  MARCA LIBERTY - VERTIV', 3750.00, 1, NULL, 26, NULL, NULL, 'A', '2020-11-08 15:52:27', '2020-11-08 22:37:55'),
(97, 'OME8-A00', 'DP/00FKKK', 4.00, 'ADAPTADOR  HDMI 4K A MINI DISPLAY PORT', 20.00, 2, NULL, 19, 123, NULL, 'E', '2020-11-08 16:39:34', '2020-11-08 16:42:16'),
(98, NULL, 'TRUN478', 1.00, 'GABINETE DE COMUNICACIONES PISO DE 24RU', 425.29, 2, 8, 27, 128, 8, 'A', '2020-11-10 04:41:14', '2020-11-10 04:41:14'),
(99, 'NTWC004587', 'FOSDPMIHD4K', 0.00, 'Mini Display Port Dp A Hdmi Cable Adaptador P/mac/hp y Dell', 19.13, 2, 8, 28, 129, 32, 'A', '2020-11-12 02:49:50', '2020-11-12 02:49:50'),
(100, 'NTWC0038975', 'HD4K20-AFG', 0.00, 'CABLE HDMI 4K 2.0 REFORZADO 5MT', 14.04, 2, 8, 29, 130, 33, 'A', '2020-11-12 02:56:18', '2020-11-12 02:56:18'),
(101, 'NTWC159753', 'RAC-4721', 0.00, 'RACK DE PARED PARA MONITOR/TV DE 55\" A 60\"', 84.74, 2, 8, NULL, 131, NULL, 'A', '2020-11-12 03:01:36', '2020-11-12 03:01:36'),
(102, NULL, 'STP6X2MBU', 0.00, 'TX6A 10Gig SHIELDED S/FTP PATCH CORD T568B LSZH/CM 26AWG  STRANDED COLOR BLUE 2MT', 10.24, 2, 8, 5, 132, 11, 'A', '2020-11-21 04:52:41', '2020-11-21 05:01:22'),
(103, NULL, 'STP6X3MBU', 0.00, 'TX6 10Gig SHIELDED S/FTP PATC CORD T568B LSZH/CM  26AWG STRANDED BLUE 3MT 10FT', 10.68, 2, 8, 5, 133, 11, 'A', '2020-11-21 05:07:19', '2020-11-21 05:07:19'),
(104, NULL, 'P1435-E', 0.00, 'AXIS CA,ARA DE RED', 0.00, 2, NULL, 19, 134, 9, 'A', '2020-11-22 05:27:52', '2020-11-22 05:27:52'),
(105, NULL, 'Q1789-LE', 0.00, 'CAMARA DE RED', 0.00, 2, 8, 19, 135, 9, 'A', '2020-11-22 05:32:52', '2020-11-22 05:32:52'),
(106, NULL, 'T91B47', 0.00, 'ACCESORIO DE MONTAJE EN POSTE POLE MOUNT  DE 50-150mm', 0.00, 2, 8, 19, 136, 9, 'A', '2020-11-22 05:57:48', '2020-11-22 05:57:48'),
(107, NULL, 'T91B47', 0.00, 'ACCESORIO DE MONTAJE EN POSTE POLE MOUNT DE 100-410mm', 0.00, 2, 8, 19, 137, 9, 'A', '2020-11-22 06:03:53', '2020-11-26 04:02:11'),
(108, NULL, 'SG-350-10P', 0.00, 'CONMUTADOR ADMINISTRADO DE 10 PUERTOS  GIGABIT , 8 PUERTOS  RJ-45 2 PUERTOS SFP', 162.69, 2, 8, 30, 138, 14, 'A', '2020-11-22 06:37:58', '2020-11-22 06:38:54');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `proforma_cliente`
--

CREATE TABLE `proforma_cliente` (
  `id_pro` bigint(20) UNSIGNED NOT NULL,
  `id_cli` bigint(20) UNSIGNED DEFAULT NULL,
  `prof_fec` datetime DEFAULT NULL,
  `prof_mon` char(1) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `id_proy` bigint(20) UNSIGNED DEFAULT NULL,
  `id_col` bigint(20) UNSIGNED DEFAULT NULL,
  `solcli_id` bigint(20) UNSIGNED DEFAULT NULL,
  `prof_cre` int(11) DEFAULT NULL,
  `prof_imp_ini` double(8,2) DEFAULT NULL,
  `prof_int` double(8,2) DEFAULT NULL,
  `prof_cuo` int(11) DEFAULT NULL,
  `prof_val` char(20) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `prof_tie_ent` char(20) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `prof_cos_dir` double(8,2) DEFAULT NULL,
  `prof_gas_ind` double(8,2) DEFAULT NULL,
  `prof_uti` double(8,2) DEFAULT NULL,
  `prof_bas_imp` double(8,2) DEFAULT NULL,
  `prof_igv` double(8,2) DEFAULT NULL,
  `prof_neto` double(8,2) DEFAULT NULL,
  `prof_fac` double(8,2) DEFAULT NULL,
  `prof_finan` double(8,2) DEFAULT NULL,
  `prof_val_cuo` double(8,2) DEFAULT NULL,
  `prof_obs` char(200) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `prof_desc` double(8,2) DEFAULT NULL,
  `prof_cli_id_dir` int(11) DEFAULT NULL,
  `prof_cli_id_con` int(11) DEFAULT NULL,
  `prof_cli_ciu` int(11) DEFAULT NULL,
  `prof_cod` char(20) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `est_reg` char(2) COLLATE utf8mb4_unicode_ci NOT NULL,
  `est_env` char(1) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `prof_tie_ins` char(20) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `prof_con_pag` char(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `proforma_cliente`
--

INSERT INTO `proforma_cliente` (`id_pro`, `id_cli`, `prof_fec`, `prof_mon`, `id_proy`, `id_col`, `solcli_id`, `prof_cre`, `prof_imp_ini`, `prof_int`, `prof_cuo`, `prof_val`, `prof_tie_ent`, `prof_cos_dir`, `prof_gas_ind`, `prof_uti`, `prof_bas_imp`, `prof_igv`, `prof_neto`, `prof_fac`, `prof_finan`, `prof_val_cuo`, `prof_obs`, `prof_desc`, `prof_cli_id_dir`, `prof_cli_id_con`, `prof_cli_ciu`, `prof_cod`, `est_reg`, `est_env`, `prof_tie_ins`, `prof_con_pag`, `created_at`, `updated_at`) VALUES
(1, 11, '2020-11-08 11:48:46', '1', 4, 2, NULL, NULL, 0.00, 0.00, 0, '5', '0', 5625.00, 168.75, 10.00, 6356.25, 1144.12, 7500.38, 0.00, 0.00, NULL, NULL, 0.00, 14, 21, NULL, '2020-1', 'AN', '0', NULL, NULL, '2020-11-08 21:48:46', '2020-11-08 22:39:27'),
(2, 8, '2020-11-08 11:55:04', '2', 6, 2, NULL, NULL, 0.00, 0.00, 0, '5', '0', 750.00, 22.50, 0.00, 772.50, 139.05, 911.55, 0.00, 0.00, NULL, NULL, 0.00, 7, 15, NULL, '2020-2', 'AN', '0', NULL, NULL, '2020-11-08 21:55:04', '2020-11-08 22:39:23'),
(3, 8, '2020-11-08 13:12:02', NULL, NULL, 2, 2, NULL, 0.00, 0.00, 0, '5', '0', 1213.99, 36.42, 0.00, 1250.41, 225.07, 1475.49, 0.00, 0.00, NULL, NULL, 0.00, 8, 15, NULL, '2020-3', 'AN', '0', NULL, NULL, '2020-11-08 23:12:02', '2020-11-11 03:15:11'),
(4, 8, '2020-11-09 19:04:52', '2', 5, 2, 3, 1, 0.00, 0.00, 0, '15', '10', 687.51, 20.63, 10.00, 776.89, 139.84, 916.73, 0.00, 0.00, NULL, NULL, 0.00, 8, 15, NULL, '2020-4', 'AN', '0', NULL, NULL, '2020-11-10 05:04:52', '2020-11-11 03:16:39'),
(5, 8, '2020-11-10 17:15:01', '2', 8, 2, 4, 1, 0.00, 0.00, 0, '5', '0', 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, NULL, 'SERVICIO A TODO COSTO INCLUYE MATERIALES, MANO DE OBRA, PRUEVAS DE CALIDAD Y CERTIFICACION DE LA PUESTA A TIERRA', 0.00, 8, 15, NULL, '2020-5', 'AN', '0', NULL, NULL, '2020-11-11 03:15:01', '2020-11-11 03:15:19'),
(6, 7, '2020-11-11 18:07:46', NULL, 9, 2, 5, NULL, 0.00, 0.00, 0, '5', '0', 1081.21, 32.44, 10.00, 1221.77, 219.92, 1441.69, 0.00, 0.00, NULL, NULL, 0.00, 16, 20, NULL, '2020-6', 'A', '0', NULL, NULL, '2020-11-12 04:07:46', '2020-11-12 04:07:46'),
(7, 7, '2020-11-20 19:47:37', '2', 10, 2, 6, NULL, 0.00, 0.00, 0, '5', '2 a la orden de comp', 540.86, 16.23, 0.00, 557.08, 94.43, 619.06, 0.00, 0.00, NULL, NULL, 3.00, 16, 22, NULL, '2020-7', 'A', '0', NULL, NULL, '2020-11-21 05:47:37', '2020-11-21 05:47:37');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `proforma_cliente_det`
--

CREATE TABLE `proforma_cliente_det` (
  `id_prof_det` bigint(20) UNSIGNED NOT NULL,
  `id_pro` bigint(20) UNSIGNED DEFAULT NULL,
  `id_prod` bigint(20) UNSIGNED DEFAULT NULL,
  `prof_det_can` double(8,2) DEFAULT NULL,
  `prof_det_pre_lis` double(8,2) DEFAULT NULL,
  `prof_det_imp` double(8,2) DEFAULT NULL,
  `prof_det_cos` double(8,2) DEFAULT NULL,
  `prof_det_tcos` double(8,2) DEFAULT NULL,
  `prof_det_por_com` double(8,2) DEFAULT NULL,
  `prof_det_com` double(8,2) DEFAULT NULL,
  `id_prov` bigint(20) UNSIGNED DEFAULT NULL,
  `prof_prod_serv` int(11) DEFAULT NULL,
  `prof_des_prod` varchar(2000) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `prof_can_prod` double(8,2) DEFAULT NULL,
  `prof_det_stock` char(200) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `prof_dir_prov` char(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `prof_ema_prov` char(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `id_sec` bigint(20) UNSIGNED DEFAULT NULL,
  `id_prov_dir` bigint(20) UNSIGNED DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `est_reg` char(2) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `proforma_cliente_det`
--

INSERT INTO `proforma_cliente_det` (`id_prof_det`, `id_pro`, `id_prod`, `prof_det_can`, `prof_det_pre_lis`, `prof_det_imp`, `prof_det_cos`, `prof_det_tcos`, `prof_det_por_com`, `prof_det_com`, `id_prov`, `prof_prod_serv`, `prof_des_prod`, `prof_can_prod`, `prof_det_stock`, `prof_dir_prov`, `prof_ema_prov`, `id_sec`, `id_prov_dir`, `created_at`, `updated_at`, `est_reg`) VALUES
(1, 1, NULL, 1.00, 5625.00, 5625.00, 3750.00, 3750.00, NULL, 1875.00, NULL, 2, 'Mantenimiento Preventivo de UPS 02 equipos, 08 Bancos de Baterías Externas  Marca LIBERTY - VERTIV Modelo ITA2 Potencia 20KVA', NULL, NULL, NULL, NULL, 2, NULL, '2020-11-08 21:48:46', '2020-11-08 21:48:46', 'A'),
(2, 2, NULL, 1.00, 750.00, 750.00, 500.00, 500.00, NULL, 250.00, NULL, 2, 'Montaje de Antenas Para Enlace entre Oficinas de Raciemsa sede Juliaca - Deprodeca Sede Juliaca', NULL, NULL, NULL, NULL, 2, NULL, '2020-11-08 21:55:04', '2020-11-08 21:55:04', 'A'),
(3, 3, NULL, 1.00, 908.00, 908.00, 605.33, 605.33, NULL, 302.67, NULL, 2, 'SISTEMA PUESTA A TIERRA P.A.T.(POZO A TIERRA) VERTICAL  MENOR A 8 OHMIOS', NULL, NULL, NULL, NULL, 3, NULL, '2020-11-08 23:12:02', '2020-11-08 23:12:02', 'A'),
(4, 3, NULL, 1.00, 83.00, 83.00, 83.00, 83.00, NULL, 0.00, NULL, 2, 'POLIZA DE ASEGURAMIENTO SCTR', NULL, NULL, NULL, NULL, NULL, NULL, '2020-11-08 23:12:02', '2020-11-08 23:12:02', 'A'),
(5, 3, NULL, 1.00, 23.00, 23.00, 23.00, 23.00, NULL, 0.00, NULL, 2, 'PRUEVA RAPIDA COVID-19', NULL, NULL, NULL, NULL, NULL, NULL, '2020-11-08 23:12:02', '2020-11-08 23:12:02', 'A'),
(6, 3, NULL, 1.00, 150.00, 150.00, 150.00, 150.00, NULL, 0.00, NULL, 2, 'MOVILIZACION DE PERSONAL AQP-JUL-AQP', NULL, NULL, NULL, NULL, NULL, NULL, '2020-11-08 23:12:02', '2020-11-08 23:12:02', 'A'),
(7, 3, NULL, 1.00, 50.00, 50.00, 50.00, 50.00, NULL, 0.00, NULL, 2, 'ALIMENTACION HOSPEDAJE', NULL, NULL, NULL, NULL, NULL, NULL, '2020-11-08 23:12:02', '2020-11-08 23:12:02', 'A'),
(8, 4, 5, 3.00, 0.57, 1.71, 0.38, 1.14, NULL, 0.19, 1, 1, 'CABLE CAT6 4P UTP 24AWG LSZH WT (305M) COLOR WHITE', 735.00, NULL, 'CAL.ONTARIO NRO. 157 URB. LA CAMPIÑA  CHORRILLOS', NULL, 4, NULL, '2020-11-10 05:04:52', '2020-11-10 05:04:52', 'A'),
(9, 4, 6, 58.00, 5.00, 289.71, 3.33, 193.14, NULL, 1.66, 1, 1, 'MODULO CONECTOR SERIE SL CAT6 U/UTP, COLOR AZUL', 11.00, '30 DIAS', 'CAL.ONTARIO NRO. 157 URB. LA CAMPIÑA  CHORRILLOS', NULL, 4, NULL, '2020-11-10 05:04:52', '2020-11-10 05:04:52', 'A'),
(10, 4, 9, 42.00, 5.14, 216.09, 3.43, 144.06, NULL, 1.72, 1, 1, 'CABLE DE PACHEO CAT6 U/UTP NO-PLENUM CM, COLOR AZUL 10 PIES', 11.00, '30 DIAS', 'CAL.ONTARIO NRO. 157 URB. LA CAMPIÑA  CHORRILLOS', NULL, 4, NULL, '2020-11-10 05:04:52', '2020-11-10 05:04:52', 'A'),
(11, 4, NULL, 6.00, 30.00, 180.00, 20.00, 120.00, NULL, 10.00, NULL, 2, 'PRUEBA COVID-19', NULL, NULL, NULL, NULL, 1, NULL, '2020-11-10 05:04:52', '2020-11-10 05:04:52', 'A'),
(12, 5, NULL, 1.00, 0.00, 0.00, 0.00, 0.00, NULL, 0.00, NULL, 2, 'SISTEMA DE PUESTA A TIERRA P.A.T.  VERTICAL MENOR A 8 OHMIOS', NULL, NULL, NULL, NULL, 3, NULL, '2020-11-11 03:15:01', '2020-11-11 03:15:01', 'A'),
(13, 5, NULL, 1.00, 0.00, 0.00, 0.00, 0.00, NULL, 0.00, NULL, 2, 'POLIZA DE ASEGURAMIENTO SCTR', NULL, NULL, NULL, NULL, 1, NULL, '2020-11-11 03:15:01', '2020-11-11 03:15:01', 'A'),
(14, 5, NULL, 1.00, 0.00, 0.00, 0.00, 0.00, NULL, 0.00, NULL, 2, 'PRUBA RAPIDA COVID-19', NULL, NULL, NULL, NULL, 1, NULL, '2020-11-11 03:15:01', '2020-11-11 03:15:01', 'A'),
(15, 5, NULL, 1.00, 0.00, 0.00, 0.00, 0.00, NULL, 0.00, NULL, 2, 'HOSPEDAJE / ALIMENTACION', NULL, NULL, NULL, NULL, 1, NULL, '2020-11-11 03:15:01', '2020-11-11 03:15:01', 'A'),
(16, 5, NULL, 1.00, 0.00, 0.00, 0.00, 0.00, NULL, 0.00, NULL, 2, 'MOVILIZACION DE PERSONAL AREQUIPA - JULIACA AREQUIPA', NULL, NULL, NULL, NULL, 1, NULL, '2020-11-11 03:15:01', '2020-11-11 03:15:01', 'A'),
(17, 6, NULL, 1.00, 105.00, 105.00, 70.00, 70.00, NULL, 35.00, NULL, 2, 'CAPACITACION   AXIS CAMARA STATION  NIVEL USUARIO', NULL, NULL, NULL, NULL, NULL, NULL, '2020-11-12 04:07:46', '2020-11-12 04:07:46', 'A'),
(18, 6, NULL, 12.00, 15.00, 180.00, 10.00, 120.00, NULL, 5.00, NULL, 2, 'CONFIGURACION DE CAMARAS AXIS TIPO FIJAS EN NVR', NULL, NULL, NULL, NULL, NULL, NULL, '2020-11-12 04:07:46', '2020-11-12 04:07:46', 'A'),
(19, 6, NULL, 1.00, 60.00, 60.00, 40.00, 40.00, NULL, 20.00, NULL, 2, 'CONFIGURACION DE CAMARA AXIS PANORAMICA EN NVR', NULL, NULL, NULL, NULL, NULL, NULL, '2020-11-12 04:07:46', '2020-11-12 04:07:46', 'A'),
(20, 6, NULL, 4.00, 30.00, 120.00, 20.00, 80.00, NULL, 10.00, NULL, 2, 'CONFIGURACION DE RUTINAS DE VIGILANCIA EN CAMARAS AXIS PTZ', NULL, NULL, NULL, NULL, NULL, NULL, '2020-11-12 04:07:46', '2020-11-12 04:07:46', 'A'),
(21, 6, NULL, 1.00, 135.00, 135.00, 90.00, 90.00, NULL, 45.00, NULL, 2, 'MOVILIZACION DE PERSONAL AQP-MAT-AQP', NULL, NULL, NULL, NULL, NULL, NULL, '2020-11-12 04:07:46', '2020-11-12 04:07:46', 'A'),
(22, 6, NULL, 4.00, 42.85, 171.42, 28.57, 114.28, NULL, 14.29, NULL, 2, 'HOSPEDAJE MOLLENDO', NULL, NULL, NULL, NULL, NULL, NULL, '2020-11-12 04:07:46', '2020-11-12 04:07:46', 'A'),
(23, 6, NULL, 4.00, 17.13, 68.52, 11.42, 45.68, NULL, 5.71, NULL, 2, 'ALIMENTACION MATARANI', NULL, NULL, NULL, NULL, NULL, NULL, '2020-11-12 04:07:46', '2020-11-12 04:07:46', 'A'),
(24, 6, NULL, 1.00, 45.00, 45.00, 30.00, 30.00, NULL, 15.00, NULL, 2, 'STARTUP DE NVR AXIS S1148 24TB CAMARA STATION', NULL, NULL, NULL, NULL, NULL, NULL, '2020-11-12 04:07:46', '2020-11-12 04:07:46', 'A'),
(25, 6, NULL, 1.00, 45.00, 45.00, 30.00, 30.00, NULL, 15.00, NULL, 2, 'STARTUP VIDEO SURVEILLANCE CONTROL BOARD', NULL, NULL, NULL, NULL, NULL, NULL, '2020-11-12 04:07:46', '2020-11-12 04:07:46', 'A'),
(26, 6, NULL, 1.00, 34.27, 34.27, 22.85, 22.85, NULL, 11.43, NULL, 2, 'PRUEBA DE DESCARTE RAPIDA COVID-19', NULL, NULL, NULL, NULL, NULL, NULL, '2020-11-12 04:07:46', '2020-11-12 04:07:46', 'A'),
(27, 6, NULL, 1.00, 117.00, 117.00, 78.00, 78.00, NULL, 39.00, NULL, 2, 'POLIZA DE ASEGURAMIENTO SCTR, SALUD, PENSION', NULL, NULL, NULL, NULL, NULL, NULL, '2020-11-12 04:07:46', '2020-11-12 04:07:46', 'A'),
(28, 7, 102, 20.00, 12.80, 256.00, 10.24, 204.80, NULL, 2.56, 1, 1, 'TX6A 10Gig SHIELDED S/FTP PATCH CORD T568B LSZH/CM 26AWG  STRANDED COLOR BLUE 2MT', 0.00, NULL, 'CAL.ONTARIO NRO. 157 URB. LA CAMPIÑA  CHORRILLOS', 'maria.chavez@anixter.com', 4, NULL, '2020-11-21 05:47:37', '2020-11-21 05:47:37', 'A'),
(29, 7, 103, 20.00, 13.35, 267.00, 10.68, 213.60, NULL, 2.67, 1, 1, 'TX6 10Gig SHIELDED S/FTP PATC CORD T568B LSZH/CM  26AWG STRANDED BLUE 3MT 10FT', 0.00, NULL, 'CAL.ONTARIO NRO. 157 URB. LA CAMPIÑA  CHORRILLOS', 'maria.chavez@anixter.com', 4, NULL, '2020-11-21 05:47:37', '2020-11-21 05:47:37', 'A'),
(30, 7, NULL, 1.00, 17.86, 17.86, 14.29, 14.29, NULL, 3.57, NULL, 2, 'NTWC  DELIVERY', NULL, NULL, NULL, NULL, 1, NULL, '2020-11-21 05:47:37', '2020-11-21 05:47:37', 'A');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `proveedor`
--

CREATE TABLE `proveedor` (
  `id_prov` bigint(20) UNSIGNED NOT NULL,
  `razsoc_prov` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `ema_prov` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `num_doc_prov` char(11) COLLATE utf8mb4_unicode_ci NOT NULL,
  `id_tipdoc` bigint(20) UNSIGNED DEFAULT NULL,
  `est_reg` char(2) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'A',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `proveedor`
--

INSERT INTO `proveedor` (`id_prov`, `razsoc_prov`, `ema_prov`, `num_doc_prov`, `id_tipdoc`, `est_reg`, `created_at`, `updated_at`) VALUES
(1, 'ANIXTER PERU S.A.C.', 'maria.chavez@anixter.com', '20418354781', 3, 'A', '2020-07-10 14:23:25', '2020-11-17 21:04:54'),
(2, 'NEXUS TECHNOLOGY', NULL, '20434839867', 3, 'A', '2020-08-15 00:32:45', '2020-08-15 00:32:45'),
(3, 'MAFORT SERVICE S.A.C.', 'fcojal@mafortservice,com', '20510300770', 3, 'A', '2020-11-08 15:40:41', '2020-11-08 15:40:41'),
(4, 'PACIFICO DISTRIBUCIONES  S.A.C.', 'pacificodistribucionessac@peri.com', '20100194601', 3, 'A', '2020-12-27 20:49:55', '2020-12-27 20:49:55');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `proveedor_banco`
--

CREATE TABLE `proveedor_banco` (
  `id_prov_ban` bigint(20) UNSIGNED NOT NULL,
  `tip_prov_ban` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `cue_prov_ban` varchar(200) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `ban_prov_ban` varchar(200) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `id_prov` bigint(20) UNSIGNED DEFAULT NULL,
  `com_prov_ban` varchar(200) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `est_reg` char(2) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `proveedor_banco`
--

INSERT INTO `proveedor_banco` (`id_prov_ban`, `tip_prov_ban`, `cue_prov_ban`, `ban_prov_ban`, `id_prov`, `com_prov_ban`, `est_reg`, `created_at`, `updated_at`) VALUES
(1, 'BANCARIA', '3363105102371', 'INTERBANK', 1, 'CUENTA SIMPLE', 'E', '2020-07-10 14:31:13', '2020-07-10 14:31:21'),
(2, 'Dolares', '194-1112239-1-46', 'Credito', 1, 'Cuenta Corriente Dolares', 'A', '2020-07-15 10:09:52', '2020-07-15 10:09:52'),
(3, 'Soles', '194-1500869-0-91', 'Credito', 1, 'Cuenta Corriente Soles', 'A', '2020-07-15 10:09:52', '2020-07-15 10:09:52'),
(4, 'Dolares', '000-4190877', 'Scotiabank', 1, 'Cuenta Corriente Dolares', 'A', '2020-07-15 10:09:52', '2020-07-15 10:09:52'),
(5, 'Soles', '000-9853421', 'Scotiabank', 1, 'Cuenta Corriente Soles', 'A', '2020-07-15 10:09:53', '2020-07-15 10:09:53');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `proveedor_colaborador`
--

CREATE TABLE `proveedor_colaborador` (
  `id_prov_col` bigint(20) UNSIGNED NOT NULL,
  `nom_prov_col` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `ema_prov_col` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `tel_prov_col` char(10) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `id_prov` bigint(20) UNSIGNED DEFAULT NULL,
  `ane_prov_col` char(8) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `car_prov_col` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `est_reg` char(2) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `proveedor_colaborador`
--

INSERT INTO `proveedor_colaborador` (`id_prov_col`, `nom_prov_col`, `ema_prov_col`, `tel_prov_col`, `id_prov`, `ane_prov_col`, `car_prov_col`, `est_reg`, `created_at`, `updated_at`) VALUES
(1, 'Maria  Teresa Chavez', 'maria.chavez@anixter.com', '945610807', 1, NULL, 'Inside Sales Regiones Perú', 'A', '2020-07-15 10:09:53', '2020-07-15 10:09:53'),
(2, 'Karla Sanchez', 'karla.sanchez@anixter.com', '977253029', 1, NULL, 'Accounts Receivable Analyst', 'A', '2020-07-15 10:09:53', '2020-07-15 10:09:53'),
(3, 'Fernando Lozada', 'flozada@nexus.com.pe', '958313594', 2, NULL, 'Jefatura Zonal Sur', 'A', '2020-08-15 00:44:58', '2020-12-27 20:39:34'),
(4, 'Flor de Maria Cojal Tolentino', 'fcojal@mafortservice.com', '948792285', 3, NULL, 'Ventas Corporativas', 'A', '2020-11-08 15:47:32', '2020-11-08 15:47:32'),
(5, 'Jesus Lopez', NULL, NULL, 4, NULL, 'Ventas', 'A', '2020-12-27 20:53:02', '2020-12-27 20:53:02');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `proveedor_direccion`
--

CREATE TABLE `proveedor_direccion` (
  `id_prov_dir` bigint(20) UNSIGNED NOT NULL,
  `ciu_prov` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `dir_prov` varchar(200) COLLATE utf8mb4_unicode_ci NOT NULL,
  `tel_prov` char(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `id_prov` bigint(20) UNSIGNED DEFAULT NULL,
  `est_reg` char(2) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `proveedor_direccion`
--

INSERT INTO `proveedor_direccion` (`id_prov_dir`, `ciu_prov`, `dir_prov`, `tel_prov`, `id_prov`, `est_reg`, `created_at`, `updated_at`) VALUES
(1, 'Lima', 'CAL.ONTARIO NRO. 157 URB. LA CAMPIÑA  CHORRILLOS  LIMA', '014151000', 1, 'A', '2020-07-10 14:25:35', '2020-07-15 10:09:53'),
(2, 'Lima', 'CAL.ONTARIO NRO. 157 URB. LA CAMPINA', NULL, 1, 'E', '2020-07-10 14:25:35', '2020-07-10 14:25:52'),
(3, 'LIMA', 'CAR. PANAMERICANA SUR NRO. 2001 INT. J45 OTR. AUTOPISTA (KM 38)', NULL, 1, 'E', '2020-07-10 14:25:35', '2020-07-15 10:09:53'),
(4, 'LIMA', 'CAR. PANAMERICANA SUR NRO. 2001 INT. J45 OTR. AUTOPISTA (KM 38)', NULL, 1, 'E', '2020-07-10 14:25:35', '2020-07-10 14:25:52'),
(5, 'AREQUIPA', 'AV. EJERCITO 101 DISTRITO DE YANAHUARA, OFICINA 201', '54428883', 2, 'A', '2020-08-15 00:44:58', '2020-12-27 20:39:34'),
(6, 'Lima', 'Av. Circunvalación Nº595 Urb. San Ignacio de Loyola Santiago de Surco', '5112750965', 3, 'A', '2020-11-08 15:47:32', '2020-11-08 15:47:32'),
(7, 'Arequipa', 'Pasaje Martinete 128, Cercado', '5154226072', 4, 'A', '2020-12-27 20:53:02', '2020-12-27 20:53:02');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `proyecto`
--

CREATE TABLE `proyecto` (
  `id_proy` bigint(20) UNSIGNED NOT NULL,
  `nom_proy` varchar(250) COLLATE utf8mb4_unicode_ci NOT NULL,
  `ser_proy` char(8) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `num_proy` char(4) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `id_cli` bigint(20) UNSIGNED DEFAULT NULL,
  `est_reg` char(2) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `proyecto`
--

INSERT INTO `proyecto` (`id_proy`, `nom_proy`, `ser_proy`, `num_proy`, `id_cli`, `est_reg`, `created_at`, `updated_at`) VALUES
(1, 'IMPLEMENTACION DE CCTV-LABORATORIO', 'NTWC-P-', '0001', 18, 'A', '2020-07-31 00:46:20', '2020-07-31 00:46:52'),
(2, 'IMPLEMENTACION DE CAMARA DE VIDEO VIGILANCIA  PTZ  CON ANALITICA GARITA DE INGRESO', 'NTWC-P-', '0002', 7, 'A', '2020-08-14 06:01:03', '2020-08-14 06:01:03'),
(3, 'SERVIDOR DE VIDEO NVR DE 48 CANALES PARA SERMONTADO EN BASTIDOR', 'NTWC-P-', '0003', 7, 'A', '2020-08-21 08:29:18', '2020-08-21 08:29:18'),
(4, 'MANTENIMIENTO PREVENTIVO UPS TRIFASICO POTENCIA 20KVA MARCA LIBERTY - VERTIV', 'NTWC-P-', '0004', 11, 'A', '2020-11-08 15:48:59', '2020-11-08 15:57:45'),
(5, 'IMPLEMENTACION DE RED LAN RACIEMSA SEDE JULIACA', 'NTWC-P-', '0005', 8, 'A', '2020-11-08 20:49:55', '2020-11-08 20:49:55'),
(6, 'MONTAJE DE ANTENAS UBIQUITI PARA ENLACE OF. RACIEMSA JULIACA - OFICINA DEPRODECA  JULIACA', 'NTWC-P-', '0006', 8, 'A', '2020-11-08 20:51:46', '2020-11-10 03:17:54'),
(7, 'IMPLEMENTACION SISTEMA DE VIDEO VIGILANCIA CCTV', 'NTWC-P-', '0007', 7, 'T', '2020-11-08 20:56:24', '2020-11-10 03:16:48'),
(8, 'SISTEMA DE PUESTA A TIERRA  P.A.T RACIENSA SEDE JULIACA', 'NTWC-P-', '0008', 8, 'A', '2020-11-08 22:14:19', '2020-11-10 03:18:25'),
(9, 'INSTALACION DE NVR AXIS, WORKSTATION AXIS, RAKEO DE MONITORES', 'NTWC-P-', '0009', 7, 'A', '2020-11-12 02:22:16', '2020-11-12 02:22:16'),
(10, 'PATCH CORD CAT6A SHIELDED S/FTP/SHZ COLOR AZUL DE 2/3MT', 'NTWC-P-', '0010', 7, 'T', '2020-11-20 19:33:07', '2020-12-27 20:53:19');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `registro_cambio`
--

CREATE TABLE `registro_cambio` (
  `id_regcam` bigint(20) UNSIGNED NOT NULL,
  `des_regcam` varchar(200) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `det_regcam` varchar(200) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `id_tipcam` bigint(20) UNSIGNED DEFAULT NULL,
  `id_col` bigint(20) UNSIGNED DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `registro_cambio`
--

INSERT INTO `registro_cambio` (`id_regcam`, `des_regcam`, `det_regcam`, `id_tipcam`, `id_col`, `created_at`, `updated_at`) VALUES
(1, 'Se creo la marca con ID: 2', NULL, 1, 1, '2020-06-11 21:01:30', '2020-06-11 21:01:30'),
(2, 'Se modifico el producto con ID: 1', NULL, 2, 1, '2020-06-11 22:47:02', '2020-06-11 22:47:02'),
(3, 'Se creo el fabricante con ID: 2', NULL, 1, 1, '2020-06-12 05:32:56', '2020-06-12 05:32:56'),
(4, 'Se elimino el fabricante con ID: 2', NULL, 3, 1, '2020-06-12 05:33:08', '2020-06-12 05:33:08'),
(5, 'Se creo la unidad de medida con ID: 2', NULL, 1, 1, '2020-06-12 15:28:07', '2020-06-12 15:28:07'),
(6, 'Se creo la unidad de medida con ID: 3', NULL, 1, 1, '2020-06-12 15:30:32', '2020-06-12 15:30:32'),
(7, 'Se creo la unidad de medida con ID: 4', NULL, 1, 1, '2020-06-12 15:31:05', '2020-06-12 15:31:05'),
(8, 'Se creo la unidad de medida con ID: 5', NULL, 1, 1, '2020-06-12 15:31:34', '2020-06-12 15:31:34'),
(15, 'Se creo la marca con ID: 3', NULL, 1, 1, '2020-06-12 21:52:17', '2020-06-12 21:52:17'),
(16, 'Se creo la marca con ID: 4', NULL, 1, 1, '2020-06-12 21:52:26', '2020-06-12 21:52:26'),
(17, 'Se creo el modelo con ID: 2', NULL, 1, 1, '2020-06-12 21:53:24', '2020-06-12 21:53:24'),
(18, 'Se creo el modelo con ID: 3', NULL, 1, 1, '2020-06-12 21:54:15', '2020-06-12 21:54:15'),
(19, 'Se modifico el fabricante con ID: 1', NULL, 2, 1, '2020-06-12 21:55:35', '2020-06-12 21:55:35'),
(20, 'Se creo el fabricante con ID: 3', NULL, 1, 1, '2020-06-12 21:57:51', '2020-06-12 21:57:51'),
(21, 'Se creo el fabricante con ID: 4', NULL, 1, 1, '2020-06-12 21:58:17', '2020-06-12 21:58:17'),
(22, 'Se modifico el producto con ID: 1', NULL, 2, 1, '2020-06-12 22:00:16', '2020-06-12 22:00:16'),
(23, 'Se creo el cliente con ID: 4', NULL, 1, 1, '2020-06-12 22:30:25', '2020-06-12 22:30:25'),
(24, 'Se modifico el cliente con ID: 4', NULL, 2, 1, '2020-06-12 22:30:45', '2020-06-12 22:30:45'),
(25, 'Se elimino el cliente con ID: 4', NULL, 3, 1, '2020-06-12 22:30:51', '2020-06-12 22:30:51'),
(30, 'Se elimino la marca con ID: 1', NULL, 3, 1, '2020-06-12 23:33:06', '2020-06-12 23:33:06'),
(31, 'Se elimino la marca con ID: 2', NULL, 3, 1, '2020-06-12 23:33:09', '2020-06-12 23:33:09'),
(32, 'Se elimino la marca con ID: 3', NULL, 3, 1, '2020-06-12 23:33:13', '2020-06-12 23:33:13'),
(33, 'Se elimino la marca con ID: 4', NULL, 3, 1, '2020-06-12 23:33:15', '2020-06-12 23:33:15'),
(34, 'Se creo la marca con ID: 5', NULL, 1, 1, '2020-06-12 23:36:17', '2020-06-12 23:36:17'),
(35, 'Se creo el producto con ID: 2', NULL, 1, 1, '2020-06-12 23:43:30', '2020-06-12 23:43:30'),
(36, 'Se creo la marca con ID: 6', NULL, 1, 1, '2020-06-12 23:45:04', '2020-06-12 23:45:04'),
(37, 'Se creo el modelo con ID: 4', NULL, 1, 1, '2020-06-12 23:45:11', '2020-06-12 23:45:11'),
(38, 'Se creo el fabricante con ID: 5', NULL, 1, 1, '2020-06-12 23:45:18', '2020-06-12 23:45:18'),
(39, 'Se modifico el producto con ID: 2', NULL, 2, 1, '2020-06-12 23:47:47', '2020-06-12 23:47:47'),
(40, 'Se creo el usuario con ID: 15', NULL, 1, 1, '2020-06-12 23:52:57', '2020-06-12 23:52:57'),
(41, 'Se creo el cliente con ID: 5', NULL, 1, 1, '2020-06-13 12:39:18', '2020-06-13 12:39:18'),
(42, 'Se modifico el cliente con ID: 5', NULL, 2, 1, '2020-06-13 12:39:46', '2020-06-13 12:39:46'),
(43, 'Se modifico el cliente con ID: 5', NULL, 2, 1, '2020-06-13 12:41:24', '2020-06-13 12:41:24'),
(45, 'Se creo el usuario con ID: 17', NULL, 1, 2, '2020-06-20 06:11:04', '2020-06-20 06:11:04'),
(46, 'Se modifico el usuario con ID: 16', NULL, 2, 2, '2020-06-20 06:11:58', '2020-06-20 06:11:58'),
(47, 'Se modifico el cargo con ID: 2', NULL, 2, 2, '2020-06-20 06:14:30', '2020-06-20 06:14:30'),
(48, 'Se modifico el cargo con ID: 1', NULL, 2, 2, '2020-06-20 06:14:45', '2020-06-20 06:14:45'),
(49, 'Se creo el producto con ID: 3', NULL, 1, 3, '2020-06-20 06:19:25', '2020-06-20 06:19:25'),
(50, 'Se creo el cargo con ID: 3', NULL, 1, 2, '2020-06-20 06:20:37', '2020-06-20 06:20:37'),
(51, 'Se creo el cargo con ID: 4', NULL, 1, 2, '2020-06-20 06:21:14', '2020-06-20 06:21:14'),
(52, 'Se modifico el producto con ID: 3', NULL, 2, 3, '2020-06-20 06:21:22', '2020-06-20 06:21:22'),
(53, 'Se elimino el producto con ID: 3', NULL, 3, 3, '2020-06-20 06:21:40', '2020-06-20 06:21:40'),
(54, 'Se creo el producto con ID: 4', NULL, 1, 3, '2020-06-20 06:23:48', '2020-06-20 06:23:48'),
(55, 'Se creo el usuario con ID: 18', NULL, 1, 2, '2020-06-20 06:25:37', '2020-06-20 06:25:37'),
(56, 'Se modifico el usuario con ID: 16', NULL, 2, 2, '2020-06-20 06:26:04', '2020-06-20 06:26:04'),
(57, 'Se modifico el usuario con ID: 17', NULL, 2, 2, '2020-06-20 06:26:36', '2020-06-20 06:26:36'),
(58, 'Se modifico el fabricante con ID: 1', NULL, 2, 2, '2020-06-20 22:34:04', '2020-06-20 22:34:04'),
(59, 'Se creo la marca con ID: 7', NULL, 1, 2, '2020-06-20 22:35:35', '2020-06-20 22:35:35'),
(60, 'Se creo la marca con ID: 8', NULL, 1, 2, '2020-06-20 22:36:09', '2020-06-20 22:36:09'),
(61, 'Se creo la marca con ID: 9', NULL, 1, 2, '2020-06-20 22:36:30', '2020-06-20 22:36:30'),
(62, 'Se creo la marca con ID: 10', NULL, 1, 2, '2020-06-20 22:36:56', '2020-06-20 22:36:56'),
(63, 'Se creo la marca con ID: 11', NULL, 1, 2, '2020-06-20 22:37:20', '2020-06-20 22:37:20'),
(64, 'Se creo la marca con ID: 12', NULL, 1, 2, '2020-06-20 22:37:34', '2020-06-20 22:37:34'),
(65, 'Se creo la marca con ID: 13', NULL, 1, 2, '2020-06-20 22:38:00', '2020-06-20 22:38:00'),
(66, 'Se creo la marca con ID: 14', NULL, 1, 2, '2020-06-20 22:38:32', '2020-06-20 22:38:32'),
(67, 'Se creo la marca con ID: 15', NULL, 1, 2, '2020-06-20 22:38:47', '2020-06-20 22:38:47'),
(68, 'Se creo el cliente con ID: 6', NULL, 1, 2, '2020-06-20 22:53:18', '2020-06-20 22:53:18'),
(69, 'Se creo el cliente con ID: 7', NULL, 1, 2, '2020-06-20 22:57:55', '2020-06-20 22:57:55'),
(70, 'Se elimino el cliente con ID: 1', NULL, 3, 2, '2020-06-21 00:41:40', '2020-06-21 00:41:40'),
(71, 'Se elimino el cliente con ID: 3', NULL, 3, 2, '2020-06-21 00:41:46', '2020-06-21 00:41:46'),
(72, 'Se elimino el cliente con ID: 5', NULL, 3, 2, '2020-06-21 00:41:52', '2020-06-21 00:41:52'),
(73, 'Se creo el cliente con ID: 8', NULL, 1, 2, '2020-06-21 00:50:24', '2020-06-21 00:50:24'),
(74, 'Se creo el cliente con ID: 9', NULL, 1, 2, '2020-06-21 00:59:58', '2020-06-21 00:59:58'),
(75, 'Se modifico el tipo de documento con ID: 2', NULL, 2, 2, '2020-06-21 01:04:11', '2020-06-21 01:04:11'),
(76, 'Se modifico el tipo de documento con ID: 2', NULL, 2, 2, '2020-06-21 01:04:19', '2020-06-21 01:04:19'),
(77, 'Se modifico el tipo de documento con ID: 2', NULL, 2, 2, '2020-06-21 01:04:25', '2020-06-21 01:04:25'),
(78, 'Se modifico el tipo de documento con ID: 2', NULL, 2, 2, '2020-06-21 01:04:36', '2020-06-21 01:04:36'),
(79, 'Se modifico el tipo de documento con ID: 2', NULL, 2, 2, '2020-06-21 01:04:49', '2020-06-21 01:04:49'),
(80, 'Se creo el cliente con ID: 10', NULL, 1, 2, '2020-06-21 01:13:15', '2020-06-21 01:13:15'),
(81, 'Se creo el cliente con ID: 11', NULL, 1, 2, '2020-06-21 01:19:04', '2020-06-21 01:19:04'),
(82, 'Se creo el cliente con ID: 12', NULL, 1, 2, '2020-06-21 01:24:46', '2020-06-21 01:24:46'),
(83, 'Se creo el cliente con ID: 13', NULL, 1, 2, '2020-06-21 01:30:20', '2020-06-21 01:30:20'),
(84, 'Se creo el cliente con ID: 14', NULL, 1, 2, '2020-06-21 01:35:19', '2020-06-21 01:35:19'),
(85, 'Se modifico el cliente con ID: 11', NULL, 2, 2, '2020-06-21 01:37:02', '2020-06-21 01:37:02'),
(86, 'Se creo el cliente con ID: 15', NULL, 1, 2, '2020-06-21 01:45:33', '2020-06-21 01:45:33'),
(87, 'Se elimino la marca con ID: 13', NULL, 3, 2, '2020-06-24 02:46:21', '2020-06-24 02:46:21'),
(88, 'Se creo la unidad de medida con ID: 6', NULL, 1, 2, '2020-06-24 02:47:20', '2020-06-24 02:47:20'),
(89, 'Se modifico la unidad de medida con ID: 6', NULL, 2, 2, '2020-06-24 02:47:31', '2020-06-24 02:47:31'),
(90, 'Se creo el cargo con ID: 5', NULL, 1, 2, '2020-06-24 02:50:23', '2020-06-24 02:50:23'),
(91, 'Se modifico la unidad de medida con ID: 1', NULL, 2, 2, '2020-06-24 02:51:55', '2020-06-24 02:51:55'),
(92, 'Se modifico la unidad de medida con ID: 2', NULL, 2, 2, '2020-06-24 02:52:11', '2020-06-24 02:52:11'),
(93, 'Se modifico la unidad de medida con ID: 3', NULL, 2, 2, '2020-06-24 02:52:26', '2020-06-24 02:52:26'),
(94, 'Se modifico la unidad de medida con ID: 6', NULL, 2, 2, '2020-06-24 02:55:09', '2020-06-24 02:55:09'),
(95, 'Se modifico el modelo con ID: 1', NULL, 2, 2, '2020-06-24 02:56:51', '2020-06-24 02:56:51'),
(96, 'Se modifico el modelo con ID: 2', NULL, 2, 2, '2020-06-24 02:57:25', '2020-06-24 02:57:25'),
(97, 'Se modifico el modelo con ID: 3', NULL, 2, 2, '2020-06-24 02:57:39', '2020-06-24 02:57:39'),
(98, 'Se modifico el modelo con ID: 4', NULL, 2, 2, '2020-06-24 02:58:07', '2020-06-24 02:58:07'),
(99, 'Se creo el fabricante con ID: 6', NULL, 1, 2, '2020-06-24 03:00:36', '2020-06-24 03:00:36'),
(100, 'Se creo el fabricante con ID: 7', NULL, 1, 2, '2020-06-24 03:01:04', '2020-06-24 03:01:04'),
(101, 'Se creo el fabricante con ID: 8', NULL, 1, 2, '2020-06-24 03:01:58', '2020-06-24 03:01:58'),
(102, 'Se creo el fabricante con ID: 9', NULL, 1, 2, '2020-06-24 03:02:08', '2020-06-24 03:02:08'),
(103, 'Se creo el fabricante con ID: 10', NULL, 1, 2, '2020-06-24 03:02:47', '2020-06-24 03:02:47'),
(104, 'Se creo el fabricante con ID: 11', NULL, 1, 2, '2020-06-24 03:02:57', '2020-06-24 03:02:57'),
(105, 'Se creo el fabricante con ID: 12', NULL, 1, 2, '2020-06-24 03:03:45', '2020-06-24 03:03:45'),
(106, 'Se creo el fabricante con ID: 13', NULL, 1, 2, '2020-06-24 03:03:57', '2020-06-24 03:03:57'),
(107, 'Se creo el fabricante con ID: 14', NULL, 1, 2, '2020-06-24 03:04:09', '2020-06-24 03:04:09'),
(108, 'Se creo el fabricante con ID: 15', NULL, 1, 2, '2020-06-24 03:04:28', '2020-06-24 03:04:28'),
(109, 'Se creo el fabricante con ID: 16', NULL, 1, 2, '2020-06-24 03:04:50', '2020-06-24 03:04:50'),
(110, 'Se creo el fabricante con ID: 17', NULL, 1, 2, '2020-06-24 03:05:06', '2020-06-24 03:05:06'),
(111, 'Se creo el fabricante con ID: 18', NULL, 1, 2, '2020-06-24 03:05:18', '2020-06-24 03:05:18'),
(112, 'Se creo el fabricante con ID: 19', NULL, 1, 2, '2020-06-24 03:05:32', '2020-06-24 03:05:32'),
(113, 'Se creo el fabricante con ID: 20', NULL, 1, 2, '2020-06-24 03:05:42', '2020-06-24 03:05:42'),
(114, 'Se creo el fabricante con ID: 21', NULL, 1, 2, '2020-06-24 03:05:56', '2020-06-24 03:05:56'),
(115, 'Se creo el fabricante con ID: 22', NULL, 1, 2, '2020-06-24 03:06:11', '2020-06-24 03:06:11'),
(116, 'Se creo el fabricante con ID: 23', NULL, 1, 2, '2020-06-24 03:06:57', '2020-06-24 03:06:57'),
(119, 'Se creo la unidad de medida con ID: 8', NULL, 1, 2, '2020-06-24 03:10:39', '2020-06-24 03:10:39'),
(120, 'Se modifico la unidad de medida con ID: 7', NULL, 2, 2, '2020-06-24 03:11:35', '2020-06-24 03:11:35'),
(121, 'Se elimino la unidad de medida con ID: 5', NULL, 3, 2, '2020-06-24 03:11:44', '2020-06-24 03:11:44'),
(122, 'Se creo la unidad de medida con ID: 9', NULL, 1, 2, '2020-06-24 03:12:50', '2020-06-24 03:12:50'),
(123, 'Se creo la unidad de medida con ID: 10', NULL, 1, 2, '2020-06-24 03:13:36', '2020-06-24 03:13:36'),
(124, 'Se creo la unidad de medida con ID: 11', NULL, 1, 2, '2020-06-24 03:13:51', '2020-06-24 03:13:51'),
(125, 'Se modifico la unidad de medida con ID: 6', NULL, 2, 2, '2020-06-24 03:14:26', '2020-06-24 03:14:26'),
(126, 'Se creo la unidad de medida con ID: 12', NULL, 1, 2, '2020-06-24 03:16:10', '2020-06-24 03:16:10'),
(127, 'Se modifico la unidad de medida con ID: 1', NULL, 2, 2, '2020-06-24 03:16:23', '2020-06-24 03:16:23'),
(128, 'Se modifico la unidad de medida con ID: 3', NULL, 2, 2, '2020-06-24 03:16:34', '2020-06-24 03:16:34'),
(129, 'Se elimino la unidad de medida con ID: 4', NULL, 3, 2, '2020-06-24 03:16:42', '2020-06-24 03:16:42'),
(130, 'Se modifico la unidad de medida con ID: 8', NULL, 2, 2, '2020-06-24 03:16:58', '2020-06-24 03:16:58'),
(131, 'Se modifico la unidad de medida con ID: 9', NULL, 2, 2, '2020-06-24 03:17:07', '2020-06-24 03:17:07'),
(132, 'Se modifico la unidad de medida con ID: 10', NULL, 2, 2, '2020-06-24 03:17:17', '2020-06-24 03:17:17'),
(133, 'Se modifico la unidad de medida con ID: 11', NULL, 2, 2, '2020-06-24 03:17:30', '2020-06-24 03:17:30'),
(134, 'Se modifico la unidad de medida con ID: 12', NULL, 2, 2, '2020-06-24 03:17:36', '2020-06-24 03:17:36'),
(135, 'Se modifico la unidad de medida con ID: 2', NULL, 2, 2, '2020-06-24 03:18:15', '2020-06-24 03:18:15'),
(136, 'Se creo la unidad de medida con ID: 13', NULL, 1, 2, '2020-06-24 03:21:11', '2020-06-24 03:21:11'),
(137, 'Se elimino el producto con ID: 1', NULL, 3, 2, '2020-06-24 03:23:01', '2020-06-24 03:23:01'),
(138, 'Se elimino el producto con ID: 2', NULL, 3, 2, '2020-06-24 03:23:09', '2020-06-24 03:23:09'),
(139, 'Se elimino el producto con ID: 4', NULL, 3, 2, '2020-06-24 03:23:14', '2020-06-24 03:23:14'),
(140, 'Se creo la marca con ID: 16', NULL, 1, 2, '2020-06-26 03:28:22', '2020-06-26 03:28:22'),
(141, 'Se creo la unidad de medida con ID: 14', NULL, 1, 2, '2020-06-26 03:29:08', '2020-06-26 03:29:08'),
(142, 'Se elimino la unidad de medida con ID: 14', NULL, 3, 2, '2020-06-26 03:29:20', '2020-06-26 03:29:20'),
(143, 'Se creo el producto con ID: 5', NULL, 1, 2, '2020-06-26 03:36:14', '2020-06-26 03:36:14'),
(144, 'Se creo el fabricante con ID: 24', NULL, 1, 2, '2020-06-26 04:59:30', '2020-06-26 04:59:30'),
(145, 'Se creo el producto con ID: 6', NULL, 1, 2, '2020-06-26 05:05:24', '2020-06-26 05:05:24'),
(146, 'Se creo el modelo con ID: 6', NULL, 1, 2, '2020-06-26 05:07:43', '2020-06-26 05:07:43'),
(147, 'Se creo el modelo con ID: 7', NULL, 1, 2, '2020-06-26 05:08:06', '2020-06-26 05:08:06'),
(148, 'Se creo el modelo con ID: 8', NULL, 1, 2, '2020-06-26 05:08:19', '2020-06-26 05:08:19'),
(149, 'Se creo el modelo con ID: 9', NULL, 1, 2, '2020-06-26 05:08:37', '2020-06-26 05:08:37'),
(150, 'Se creo el modelo con ID: 10', NULL, 1, 2, '2020-06-26 05:08:51', '2020-06-26 05:08:51'),
(151, 'Se creo el modelo con ID: 11', NULL, 1, 2, '2020-06-26 05:09:08', '2020-06-26 05:09:08'),
(152, 'Se creo el modelo con ID: 12', NULL, 1, 2, '2020-06-26 05:09:52', '2020-06-26 05:09:52'),
(153, 'Se creo el modelo con ID: 13', NULL, 1, 2, '2020-06-26 05:10:06', '2020-06-26 05:10:06'),
(154, 'Se creo el modelo con ID: 14', NULL, 1, 2, '2020-06-26 05:10:31', '2020-06-26 05:10:31'),
(155, 'Se creo el modelo con ID: 15', NULL, 1, 2, '2020-06-26 05:32:57', '2020-06-26 05:32:57'),
(156, 'Se creo el modelo con ID: 16', NULL, 1, 2, '2020-06-26 05:33:14', '2020-06-26 05:33:14'),
(157, 'Se creo el modelo con ID: 17', NULL, 1, 2, '2020-06-26 05:33:33', '2020-06-26 05:33:33'),
(158, 'Se creo el modelo con ID: 18', NULL, 1, 2, '2020-06-26 05:34:10', '2020-06-26 05:34:10'),
(159, 'Se creo el modelo con ID: 19', NULL, 1, 2, '2020-06-26 05:34:43', '2020-06-26 05:34:43'),
(160, 'Se creo el modelo con ID: 20', NULL, 1, 2, '2020-06-26 05:35:01', '2020-06-26 05:35:01'),
(161, 'Se creo el modelo con ID: 21', NULL, 1, 2, '2020-06-26 05:35:17', '2020-06-26 05:35:17'),
(162, 'Se creo el modelo con ID: 22', NULL, 1, 2, '2020-06-26 05:36:03', '2020-06-26 05:36:03'),
(163, 'Se creo el modelo con ID: 23', NULL, 1, 2, '2020-06-26 05:38:40', '2020-06-26 05:38:40'),
(164, 'Se creo el modelo con ID: 24', NULL, 1, 2, '2020-06-26 05:38:53', '2020-06-26 05:38:53'),
(165, 'Se creo el modelo con ID: 25', NULL, 1, 2, '2020-06-26 05:39:13', '2020-06-26 05:39:13'),
(166, 'Se creo el modelo con ID: 26', NULL, 1, 2, '2020-06-26 05:39:27', '2020-06-26 05:39:27'),
(167, 'Se creo el modelo con ID: 27', NULL, 1, 2, '2020-06-26 05:40:25', '2020-06-26 05:40:25'),
(168, 'Se creo el modelo con ID: 28', NULL, 1, 2, '2020-06-26 05:40:44', '2020-06-26 05:40:44'),
(169, 'Se creo el producto con ID: 7', NULL, 1, 2, '2020-06-26 05:45:17', '2020-06-26 05:45:17'),
(170, 'Se creo el producto con ID: 8', NULL, 1, 2, '2020-06-26 05:47:54', '2020-06-26 05:47:54'),
(171, 'Se creo el producto con ID: 9', NULL, 1, 2, '2020-06-26 05:50:00', '2020-06-26 05:50:00'),
(172, 'Se elimino el usuario con ID: 2', NULL, 3, 1, '2020-06-26 06:14:30', '2020-06-26 06:14:30'),
(173, 'Se elimino el usuario con ID: 5', NULL, 3, 1, '2020-06-26 06:14:44', '2020-06-26 06:14:44'),
(174, 'Se elimino el usuario con ID: 13', NULL, 3, 1, '2020-06-26 06:14:51', '2020-06-26 06:14:51'),
(175, 'Se elimino el usuario con ID: 15', NULL, 3, 1, '2020-06-26 06:14:54', '2020-06-26 06:14:54'),
(176, 'Se creo la marca con ID: 17', NULL, 1, 1, '2020-06-26 06:19:00', '2020-06-26 06:19:00'),
(177, 'Se elimino la marca con ID: 17', NULL, 3, 1, '2020-06-26 06:20:00', '2020-06-26 06:20:00'),
(178, 'Se creo el cliente con ID: 16', NULL, 1, 1, '2020-06-26 06:21:30', '2020-06-26 06:21:30'),
(179, 'Se modifico el cliente con ID: 16', NULL, 2, 1, '2020-06-26 06:22:45', '2020-06-26 06:22:45'),
(180, 'Se modifico el cliente con ID: 8', NULL, 2, 1, '2020-06-26 06:28:45', '2020-06-26 06:28:45'),
(181, 'Se elimino el cliente con ID: 16', NULL, 3, 1, '2020-06-26 06:44:21', '2020-06-26 06:44:21'),
(182, 'Se creo el cliente con ID: 17', NULL, 1, 1, '2020-06-27 00:41:13', '2020-06-27 00:41:13'),
(183, 'Se modifico el cliente con ID: 17', NULL, 2, 1, '2020-06-27 00:42:56', '2020-06-27 00:42:56'),
(184, 'Se modifico el cliente con ID: 17', NULL, 2, 1, '2020-06-27 00:43:40', '2020-06-27 00:43:40'),
(185, 'Se creo la marca con ID: 18', NULL, 1, 2, '2020-06-27 00:52:06', '2020-06-27 00:52:06'),
(186, 'Se creo la unidad de medida con ID: 15', NULL, 1, 2, '2020-06-27 00:53:20', '2020-06-27 00:53:20'),
(187, 'Se creo el modelo con ID: 29', NULL, 1, 2, '2020-06-27 00:53:39', '2020-06-27 00:53:39'),
(188, 'Se creo el producto con ID: 10', NULL, 1, 2, '2020-06-27 00:54:07', '2020-06-27 00:54:07'),
(189, 'Se modifico el cliente con ID: 6', NULL, 2, 2, '2020-06-27 00:56:07', '2020-06-27 00:56:07'),
(190, 'Se elimino el tipo de documento con ID: 2', NULL, 3, 3, '2020-06-27 01:33:36', '2020-06-27 01:33:36'),
(191, 'Se creo el modelo con ID: 30', NULL, 1, 2, '2020-06-27 16:23:05', '2020-06-27 16:23:05'),
(192, 'Se modifico el producto con ID: 10', NULL, 2, 2, '2020-06-27 16:23:42', '2020-06-27 16:23:42'),
(193, 'Se creo el modelo con ID: 31', NULL, 1, 2, '2020-06-27 16:25:28', '2020-06-27 16:25:28'),
(194, 'Se creo el modelo con ID: 32', NULL, 1, 2, '2020-06-27 16:25:47', '2020-06-27 16:25:47'),
(195, 'Se creo el producto con ID: 11', NULL, 1, 2, '2020-06-27 16:26:51', '2020-06-27 16:26:51'),
(196, 'Se creo el modelo con ID: 33', NULL, 1, 2, '2020-06-27 16:28:34', '2020-06-27 16:28:34'),
(197, 'Se creo el producto con ID: 12', NULL, 1, 2, '2020-06-27 16:29:10', '2020-06-27 16:29:10'),
(198, 'Se elimino el modelo con ID: 29', NULL, 3, 2, '2020-06-27 16:29:35', '2020-06-27 16:29:35'),
(199, 'Se elimino el modelo con ID: 32', NULL, 3, 2, '2020-06-27 16:29:45', '2020-06-27 16:29:45'),
(200, 'Se modifico el producto con ID: 12', NULL, 2, 2, '2020-06-27 16:30:52', '2020-06-27 16:30:52'),
(201, 'Se creo el modelo con ID: 34', NULL, 1, 2, '2020-06-27 16:32:39', '2020-06-27 16:32:39'),
(202, 'Se creo el producto con ID: 13', NULL, 1, 2, '2020-06-27 16:33:09', '2020-06-27 16:33:09'),
(203, 'Se creo el modelo con ID: 35', NULL, 1, 2, '2020-06-27 16:37:25', '2020-06-27 16:37:25'),
(204, 'Se creo el producto con ID: 14', NULL, 1, 2, '2020-06-27 16:37:41', '2020-06-27 16:37:41'),
(205, 'Se creo el modelo con ID: 36', NULL, 1, 2, '2020-06-27 16:55:39', '2020-06-27 16:55:39'),
(206, 'Se creo el producto con ID: 15', NULL, 1, 2, '2020-06-27 16:56:08', '2020-06-27 16:56:08'),
(207, 'Se creo el modelo con ID: 37', NULL, 1, 2, '2020-06-27 17:01:06', '2020-06-27 17:01:06'),
(208, 'Se creo el producto con ID: 16', NULL, 1, 2, '2020-06-27 17:01:30', '2020-06-27 17:01:30'),
(209, 'Se creo el modelo con ID: 38', NULL, 1, 2, '2020-06-27 17:10:13', '2020-06-27 17:10:13'),
(210, 'Se creo el producto con ID: 17', NULL, 1, 2, '2020-06-27 17:10:34', '2020-06-27 17:10:34'),
(211, 'Se creo el modelo con ID: 39', NULL, 1, 2, '2020-06-27 17:12:33', '2020-06-27 17:12:33'),
(212, 'Se creo el producto con ID: 18', NULL, 1, 2, '2020-06-27 17:14:08', '2020-06-27 17:14:08'),
(213, 'Se creo la unidad de medida con ID: 16', NULL, 1, 2, '2020-07-07 21:30:57', '2020-07-07 21:30:57'),
(214, 'Se creo la marca con ID: 19', NULL, 1, 2, '2020-07-07 21:31:25', '2020-07-07 21:31:25'),
(215, 'Se creo el modelo con ID: 40', NULL, 1, 2, '2020-07-07 21:39:21', '2020-07-07 21:39:21'),
(216, 'Se creo el fabricante con ID: 25', NULL, 1, 2, '2020-07-07 21:39:56', '2020-07-07 21:39:56'),
(217, 'Se creo el producto con ID: 19', NULL, 1, 2, '2020-07-07 21:40:13', '2020-07-07 21:40:13'),
(218, 'Se creo el modelo con ID: 41', NULL, 1, 2, '2020-07-07 21:41:55', '2020-07-07 21:41:55'),
(219, 'Se creo el producto con ID: 20', NULL, 1, 2, '2020-07-07 21:42:25', '2020-07-07 21:42:25'),
(220, 'Se creo el modelo con ID: 42', NULL, 1, 2, '2020-07-07 21:46:11', '2020-07-07 21:46:11'),
(221, 'Se creo el producto con ID: 21', NULL, 1, 2, '2020-07-07 21:46:49', '2020-07-07 21:46:49'),
(222, 'Se creo el modelo con ID: 43', NULL, 1, 2, '2020-07-08 18:25:14', '2020-07-08 18:25:14'),
(223, 'Se creo el producto con ID: 22', NULL, 1, 2, '2020-07-08 18:25:45', '2020-07-08 18:25:45'),
(224, 'Se creo el modelo con ID: 44', NULL, 1, 2, '2020-07-08 18:32:46', '2020-07-08 18:32:46'),
(225, 'Se creo el producto con ID: 23', NULL, 1, 2, '2020-07-08 18:33:38', '2020-07-08 18:33:38'),
(226, 'Se modifico el producto con ID: 23', NULL, 2, 2, '2020-07-08 18:33:57', '2020-07-08 18:33:57'),
(227, 'Se creo el modelo con ID: 45', NULL, 1, 2, '2020-07-09 00:49:11', '2020-07-09 00:49:11'),
(228, 'Se creo el producto con ID: 24', NULL, 1, 2, '2020-07-09 00:49:37', '2020-07-09 00:49:37'),
(229, 'Se creo el modelo con ID: 46', NULL, 1, 2, '2020-07-09 00:55:13', '2020-07-09 00:55:13'),
(230, 'Se creo el producto con ID: 25', NULL, 1, 2, '2020-07-09 00:55:17', '2020-07-09 00:55:17'),
(231, 'Se creo el modelo con ID: 47', NULL, 1, 2, '2020-07-09 01:00:07', '2020-07-09 01:00:07'),
(232, 'Se creo el producto con ID: 26', NULL, 1, 2, '2020-07-09 01:00:12', '2020-07-09 01:00:12'),
(233, 'Se creo el modelo con ID: 48', NULL, 1, 2, '2020-07-09 01:04:38', '2020-07-09 01:04:38'),
(234, 'Se creo el producto con ID: 27', NULL, 1, 2, '2020-07-09 01:04:53', '2020-07-09 01:04:53'),
(235, 'Se creo el modelo con ID: 49', NULL, 1, 2, '2020-07-09 01:08:40', '2020-07-09 01:08:40'),
(236, 'Se creo el producto con ID: 28', NULL, 1, 2, '2020-07-09 01:09:17', '2020-07-09 01:09:17'),
(237, 'Se creo el modelo con ID: 50', NULL, 1, 2, '2020-07-09 01:12:54', '2020-07-09 01:12:54'),
(238, 'Se creo el producto con ID: 29', NULL, 1, 2, '2020-07-09 01:13:10', '2020-07-09 01:13:10'),
(239, 'Se creo el modelo con ID: 51', NULL, 1, 2, '2020-07-09 01:15:12', '2020-07-09 01:15:12'),
(240, 'Se creo el producto con ID: 30', NULL, 1, 2, '2020-07-09 01:15:39', '2020-07-09 01:15:39'),
(241, 'Se creo el modelo con ID: 52', NULL, 1, 2, '2020-07-09 01:20:24', '2020-07-09 01:20:24'),
(242, 'Se creo el producto con ID: 31', NULL, 1, 2, '2020-07-09 01:20:36', '2020-07-09 01:20:36'),
(243, 'Se creo el modelo con ID: 53', NULL, 1, 2, '2020-07-09 01:23:26', '2020-07-09 01:23:26'),
(244, 'Se creo el producto con ID: 32', NULL, 1, 2, '2020-07-09 01:23:53', '2020-07-09 01:23:53'),
(245, 'Se creo la marca con ID: 20', NULL, 1, 3, '2020-07-14 13:14:11', '2020-07-14 13:14:11'),
(246, 'Se creo el modelo con ID: 54', NULL, 1, 3, '2020-07-14 13:21:15', '2020-07-14 13:21:15'),
(247, 'Se creo el fabricante con ID: 26', NULL, 1, 3, '2020-07-14 13:22:04', '2020-07-14 13:22:04'),
(248, 'Se creo el producto con ID: 33', NULL, 1, 3, '2020-07-14 13:22:31', '2020-07-14 13:22:31'),
(249, 'Se creo el modelo con ID: 55', NULL, 1, 3, '2020-07-14 13:28:36', '2020-07-14 13:28:36'),
(250, 'Se creo el producto con ID: 34', NULL, 1, 3, '2020-07-14 13:28:57', '2020-07-14 13:28:57'),
(251, 'Se creo el modelo con ID: 56', NULL, 1, 3, '2020-07-14 13:31:27', '2020-07-14 13:31:27'),
(252, 'Se creo el producto con ID: 35', NULL, 1, 3, '2020-07-14 13:31:46', '2020-07-14 13:31:46'),
(253, 'Se creo el modelo con ID: 57', NULL, 1, 3, '2020-07-14 13:37:42', '2020-07-14 13:37:42'),
(254, 'Se creo el producto con ID: 36', NULL, 1, 3, '2020-07-14 13:38:01', '2020-07-14 13:38:01'),
(255, 'Se creo el modelo con ID: 58', NULL, 1, 3, '2020-07-14 13:42:22', '2020-07-14 13:42:22'),
(256, 'Se creo el producto con ID: 37', NULL, 1, 3, '2020-07-14 13:42:43', '2020-07-14 13:42:43'),
(257, 'Se creo la marca con ID: 21', NULL, 1, 3, '2020-07-14 13:51:22', '2020-07-14 13:51:22'),
(258, 'Se creo el modelo con ID: 59', NULL, 1, 3, '2020-07-14 13:52:21', '2020-07-14 13:52:21'),
(259, 'Se creo el fabricante con ID: 27', NULL, 1, 3, '2020-07-14 13:52:50', '2020-07-14 13:52:50'),
(260, 'Se creo el producto con ID: 38', NULL, 1, 3, '2020-07-14 13:52:56', '2020-07-14 13:52:56'),
(261, 'Se creo el modelo con ID: 60', NULL, 1, 3, '2020-07-14 13:53:55', '2020-07-14 13:53:55'),
(262, 'Se creo el producto con ID: 39', NULL, 1, 3, '2020-07-14 13:54:03', '2020-07-14 13:54:03'),
(263, 'Se creo la marca con ID: 22', NULL, 1, 3, '2020-07-14 13:55:12', '2020-07-14 13:55:12'),
(264, 'Se creo el fabricante con ID: 28', NULL, 1, 3, '2020-07-14 13:55:36', '2020-07-14 13:55:36'),
(265, 'Se creo el modelo con ID: 61', NULL, 1, 3, '2020-07-14 13:55:49', '2020-07-14 13:55:49'),
(266, 'Se creo el producto con ID: 40', NULL, 1, 3, '2020-07-14 13:56:11', '2020-07-14 13:56:11'),
(267, 'Se modifico el producto con ID: 39', NULL, 2, 3, '2020-07-14 13:58:20', '2020-07-14 13:58:20'),
(268, 'Se modifico el producto con ID: 40', NULL, 2, 3, '2020-07-14 13:59:54', '2020-07-14 13:59:54'),
(269, 'Se creo el modelo con ID: 62', NULL, 1, 3, '2020-07-14 14:07:43', '2020-07-14 14:07:43'),
(270, 'Se creo el producto con ID: 41', NULL, 1, 3, '2020-07-14 14:07:57', '2020-07-14 14:07:57'),
(271, 'Se creo el modelo con ID: 63', NULL, 1, 3, '2020-07-14 14:14:27', '2020-07-14 14:14:27'),
(272, 'Se creo el producto con ID: 42', NULL, 1, 3, '2020-07-14 14:14:43', '2020-07-14 14:14:43'),
(273, 'Se creo el modelo con ID: 64', NULL, 1, 3, '2020-07-14 14:16:31', '2020-07-14 14:16:31'),
(274, 'Se creo el producto con ID: 43', NULL, 1, 3, '2020-07-14 14:16:55', '2020-07-14 14:16:55'),
(275, 'Se creo la unidad de medida con ID: 17', NULL, 1, 3, '2020-07-14 14:20:45', '2020-07-14 14:20:45'),
(276, 'Se creo el modelo con ID: 65', NULL, 1, 3, '2020-07-14 14:21:10', '2020-07-14 14:21:10'),
(277, 'Se creo el producto con ID: 44', NULL, 1, 3, '2020-07-14 14:21:23', '2020-07-14 14:21:23'),
(278, 'Se creo el modelo con ID: 66', NULL, 1, 3, '2020-07-14 14:24:25', '2020-07-14 14:24:25'),
(279, 'Se creo el producto con ID: 45', NULL, 1, 3, '2020-07-14 14:24:58', '2020-07-14 14:24:58'),
(280, 'Se creo el modelo con ID: 67', NULL, 1, 3, '2020-07-14 14:31:22', '2020-07-14 14:31:22'),
(281, 'Se creo el producto con ID: 46', NULL, 1, 3, '2020-07-14 14:31:44', '2020-07-14 14:31:44'),
(282, 'Se creo el modelo con ID: 68', NULL, 1, 3, '2020-07-14 14:33:41', '2020-07-14 14:33:41'),
(283, 'Se creo el producto con ID: 47', NULL, 1, 3, '2020-07-14 14:34:05', '2020-07-14 14:34:05'),
(284, 'Se creo el modelo con ID: 69', NULL, 1, 3, '2020-07-14 14:40:03', '2020-07-14 14:40:03'),
(285, 'Se creo el producto con ID: 48', NULL, 1, 3, '2020-07-14 14:40:15', '2020-07-14 14:40:15'),
(286, 'Se creo el modelo con ID: 70', NULL, 1, 3, '2020-07-14 14:42:56', '2020-07-14 14:42:56'),
(287, 'Se creo el producto con ID: 49', NULL, 1, 3, '2020-07-14 14:43:26', '2020-07-14 14:43:26'),
(288, 'Se creo el modelo con ID: 71', NULL, 1, 3, '2020-07-14 14:45:28', '2020-07-14 14:45:28'),
(289, 'Se creo el producto con ID: 50', NULL, 1, 3, '2020-07-14 14:48:25', '2020-07-14 14:48:25'),
(290, 'Se creo el modelo con ID: 72', NULL, 1, 3, '2020-07-14 14:50:57', '2020-07-14 14:50:57'),
(291, 'Se creo el producto con ID: 51', NULL, 1, 3, '2020-07-14 14:51:14', '2020-07-14 14:51:14'),
(292, 'Se modifico el proveedor con ID: 1', NULL, 2, 2, '2020-07-15 15:09:53', '2020-07-15 15:09:53'),
(293, 'Se elimino el cliente con ID: 17', NULL, 3, 2, '2020-07-15 15:11:25', '2020-07-15 15:11:25'),
(294, 'Se modifico el cliente con ID: 6', NULL, 2, 2, '2020-07-15 15:15:57', '2020-07-15 15:15:57'),
(295, 'Se modifico el cliente con ID: 6', NULL, 2, 2, '2020-07-15 15:19:12', '2020-07-15 15:19:12'),
(296, 'Se modifico el cliente con ID: 7', NULL, 2, 2, '2020-07-15 16:08:25', '2020-07-15 16:08:25'),
(297, 'Se modifico el cliente con ID: 6', NULL, 2, 2, '2020-07-15 16:08:38', '2020-07-15 16:08:38'),
(298, 'Se modifico el cliente con ID: 7', NULL, 2, 2, '2020-07-15 16:20:40', '2020-07-15 16:20:40'),
(299, 'Se modifico el cliente con ID: 7', NULL, 2, 2, '2020-07-15 16:23:10', '2020-07-15 16:23:10'),
(300, 'Se modifico el cliente con ID: 8', NULL, 2, 2, '2020-07-15 16:23:34', '2020-07-15 16:23:34'),
(301, 'Se modifico el cliente con ID: 8', NULL, 2, 2, '2020-07-15 16:41:32', '2020-07-15 16:41:32'),
(302, 'Se creo el modelo con ID: 73', NULL, 1, 3, '2020-07-15 17:05:06', '2020-07-15 17:05:06'),
(303, 'Se creo el producto con ID: 52', NULL, 1, 3, '2020-07-15 17:05:47', '2020-07-15 17:05:47'),
(304, 'Se modifico el producto con ID: 24', NULL, 2, 3, '2020-07-15 17:26:16', '2020-07-15 17:26:16'),
(305, 'Se creo el modelo con ID: 74', NULL, 1, 3, '2020-07-15 17:31:59', '2020-07-15 17:31:59'),
(306, 'Se creo el producto con ID: 53', NULL, 1, 3, '2020-07-15 17:33:19', '2020-07-15 17:33:19'),
(307, 'Se elimino el producto con ID: 53', NULL, 3, 2, '2020-07-15 17:37:56', '2020-07-15 17:37:56'),
(308, 'Se modifico el producto con ID: 31', NULL, 2, 2, '2020-07-15 17:39:37', '2020-07-15 17:39:37'),
(309, 'Se creo el modelo con ID: 75', NULL, 1, 2, '2020-07-15 17:50:13', '2020-07-15 17:50:13'),
(310, 'Se creo el producto con ID: 54', NULL, 1, 2, '2020-07-15 17:51:12', '2020-07-15 17:51:12'),
(311, 'Se creo el modelo con ID: 76', NULL, 1, 2, '2020-07-15 19:04:45', '2020-07-15 19:04:45'),
(312, 'Se creo el producto con ID: 55', NULL, 1, 2, '2020-07-15 19:05:08', '2020-07-15 19:05:08'),
(313, 'Se modifico el producto con ID: 55', NULL, 2, 2, '2020-07-15 19:05:45', '2020-07-15 19:05:45'),
(314, 'Se modifico el modelo con ID: 76', NULL, 2, 2, '2020-07-15 19:06:45', '2020-07-15 19:06:45'),
(315, 'Se modifico el modelo con ID: 75', NULL, 2, 2, '2020-07-15 19:07:39', '2020-07-15 19:07:39'),
(316, 'Se modifico el modelo con ID: 76', NULL, 2, 2, '2020-07-15 19:08:05', '2020-07-15 19:08:05'),
(317, 'Se creo el modelo con ID: 77', NULL, 1, 2, '2020-07-15 19:14:51', '2020-07-15 19:14:51'),
(318, 'Se creo el producto con ID: 56', NULL, 1, 2, '2020-07-15 19:15:14', '2020-07-15 19:15:14'),
(319, 'Se creo el modelo con ID: 78', NULL, 1, 2, '2020-07-15 19:17:55', '2020-07-15 19:17:55'),
(320, 'Se creo el producto con ID: 57', NULL, 1, 2, '2020-07-15 19:18:21', '2020-07-15 19:18:21'),
(321, 'Se modifico el producto con ID: 57', NULL, 2, 2, '2020-07-15 19:20:09', '2020-07-15 19:20:09'),
(322, 'Se modifico el producto con ID: 57', NULL, 2, 2, '2020-07-15 19:20:33', '2020-07-15 19:20:33'),
(323, 'Se creo el modelo con ID: 79', NULL, 1, 2, '2020-07-15 19:22:14', '2020-07-15 19:22:14'),
(324, 'Se creo el producto con ID: 58', NULL, 1, 2, '2020-07-15 19:22:19', '2020-07-15 19:22:19'),
(325, 'Se modifico el modelo con ID: 79', NULL, 2, 2, '2020-07-15 19:24:15', '2020-07-15 19:24:15'),
(326, 'Se modifico el producto con ID: 57', NULL, 2, 2, '2020-07-15 19:24:50', '2020-07-15 19:24:50'),
(327, 'Se modifico el producto con ID: 58', NULL, 2, 2, '2020-07-15 19:25:08', '2020-07-15 19:25:08'),
(328, 'Se creo el modelo con ID: 80', NULL, 1, 2, '2020-07-15 19:36:02', '2020-07-15 19:36:02'),
(329, 'Se creo el producto con ID: 59', NULL, 1, 2, '2020-07-15 19:36:11', '2020-07-15 19:36:11'),
(330, 'Se creo el modelo con ID: 81', NULL, 1, 2, '2020-07-15 19:39:51', '2020-07-15 19:39:51'),
(331, 'Se creo el producto con ID: 60', NULL, 1, 2, '2020-07-15 19:40:09', '2020-07-15 19:40:09'),
(332, 'Se creo el modelo con ID: 82', NULL, 1, 2, '2020-07-15 19:44:54', '2020-07-15 19:44:54'),
(333, 'Se creo el producto con ID: 61', NULL, 1, 2, '2020-07-15 19:45:17', '2020-07-15 19:45:17'),
(334, 'Se creo el modelo con ID: 83', NULL, 1, 2, '2020-07-15 19:48:46', '2020-07-15 19:48:46'),
(335, 'Se creo el producto con ID: 62', NULL, 1, 2, '2020-07-15 19:49:03', '2020-07-15 19:49:03'),
(336, 'Se creo el modelo con ID: 84', NULL, 1, 2, '2020-07-15 19:51:35', '2020-07-15 19:51:35'),
(337, 'Se creo el producto con ID: 63', NULL, 1, 2, '2020-07-15 19:51:56', '2020-07-15 19:51:56'),
(338, 'Se creo el modelo con ID: 85', NULL, 1, 2, '2020-07-15 19:55:33', '2020-07-15 19:55:33'),
(339, 'Se creo el producto con ID: 64', NULL, 1, 2, '2020-07-15 19:55:53', '2020-07-15 19:55:53'),
(340, 'Se creo el modelo con ID: 86', NULL, 1, 2, '2020-07-15 19:57:57', '2020-07-15 19:57:57'),
(341, 'Se creo el producto con ID: 65', NULL, 1, 2, '2020-07-15 19:59:56', '2020-07-15 19:59:56'),
(342, 'Se creo el modelo con ID: 87', NULL, 1, 2, '2020-07-15 20:01:38', '2020-07-15 20:01:38'),
(343, 'Se creo el producto con ID: 66', NULL, 1, 2, '2020-07-15 20:02:04', '2020-07-15 20:02:04'),
(344, 'Se creo el modelo con ID: 88', NULL, 1, 2, '2020-07-15 20:03:25', '2020-07-15 20:03:25'),
(345, 'Se creo el producto con ID: 67', NULL, 1, 2, '2020-07-15 20:03:42', '2020-07-15 20:03:42'),
(346, 'Se creo el modelo con ID: 89', NULL, 1, 2, '2020-07-15 20:05:40', '2020-07-15 20:05:40'),
(347, 'Se creo el producto con ID: 68', NULL, 1, 2, '2020-07-15 20:06:03', '2020-07-15 20:06:03'),
(348, 'Se creo el modelo con ID: 90', NULL, 1, 2, '2020-07-15 20:15:55', '2020-07-15 20:15:55'),
(349, 'Se creo el producto con ID: 69', NULL, 1, 2, '2020-07-15 20:16:14', '2020-07-15 20:16:14'),
(350, 'Se modifico el producto con ID: 21', NULL, 2, 3, '2020-07-19 08:02:13', '2020-07-19 08:02:13'),
(351, 'Se modifico el modelo con ID: 42', NULL, 2, 3, '2020-07-19 08:02:53', '2020-07-19 08:02:53'),
(352, 'Se modifico el producto con ID: 32', NULL, 2, 3, '2020-07-19 08:06:35', '2020-07-19 08:06:35'),
(353, 'Se modifico el producto con ID: 32', NULL, 2, 3, '2020-07-19 08:09:10', '2020-07-19 08:09:10'),
(354, 'Se modifico el producto con ID: 21', NULL, 2, 3, '2020-07-19 08:09:51', '2020-07-19 08:09:51'),
(355, 'Se modifico el modelo con ID: 42', NULL, 2, 3, '2020-07-19 08:11:27', '2020-07-19 08:11:27'),
(356, 'Se modifico el producto con ID: 32', NULL, 2, 3, '2020-07-19 08:13:29', '2020-07-19 08:13:29'),
(357, 'Se modifico el producto con ID: 32', NULL, 2, 3, '2020-07-19 08:13:42', '2020-07-19 08:13:42'),
(358, 'Se modifico el producto con ID: 32', NULL, 2, 3, '2020-07-19 08:13:58', '2020-07-19 08:13:58'),
(359, 'Se modifico el producto con ID: 32', NULL, 2, 3, '2020-07-19 08:14:09', '2020-07-19 08:14:09'),
(360, 'Se modifico el producto con ID: 32', NULL, 2, 3, '2020-07-19 08:15:44', '2020-07-19 08:15:44'),
(361, 'Se modifico el producto con ID: 20', NULL, 2, 3, '2020-07-19 08:18:10', '2020-07-19 08:18:10'),
(362, 'Se modifico el modelo con ID: 41', NULL, 2, 3, '2020-07-19 08:18:28', '2020-07-19 08:18:28'),
(363, 'Se modifico el modelo con ID: 41', NULL, 2, 3, '2020-07-19 08:18:51', '2020-07-19 08:18:51'),
(364, 'Se modifico el modelo con ID: 41', NULL, 2, 3, '2020-07-19 08:20:43', '2020-07-19 08:20:43'),
(365, 'Se modifico el modelo con ID: 41', NULL, 2, 3, '2020-07-19 08:21:12', '2020-07-19 08:21:12'),
(366, 'Se modifico el producto con ID: 26', NULL, 2, 3, '2020-07-19 08:24:31', '2020-07-19 08:24:31'),
(367, 'Se modifico el modelo con ID: 47', NULL, 2, 3, '2020-07-19 08:25:03', '2020-07-19 08:25:03'),
(368, 'Se modifico el producto con ID: 26', NULL, 2, 3, '2020-07-19 08:25:43', '2020-07-19 08:25:43'),
(369, 'Se modifico el producto con ID: 23', NULL, 2, 3, '2020-07-19 08:27:55', '2020-07-19 08:27:55'),
(370, 'Se creo el modelo con ID: 91', NULL, 1, 3, '2020-07-19 08:30:59', '2020-07-19 08:30:59'),
(371, 'Se creo el producto con ID: 70', NULL, 1, 3, '2020-07-19 08:31:17', '2020-07-19 08:31:17'),
(372, 'Se creo el modelo con ID: 92', NULL, 1, 3, '2020-07-19 08:35:08', '2020-07-19 08:35:08'),
(373, 'Se creo el producto con ID: 71', NULL, 1, 3, '2020-07-19 08:35:26', '2020-07-19 08:35:26'),
(374, 'Se creo el modelo con ID: 93', NULL, 1, 3, '2020-07-19 08:39:02', '2020-07-19 08:39:02'),
(375, 'Se creo el producto con ID: 72', NULL, 1, 3, '2020-07-19 08:39:18', '2020-07-19 08:39:18'),
(376, 'Se creo la marca con ID: 23', NULL, 1, 3, '2020-07-19 08:41:03', '2020-07-19 08:41:03'),
(377, 'Se creo la marca con ID: 24', NULL, 1, 3, '2020-07-19 08:41:03', '2020-07-19 08:41:03'),
(378, 'Se creo el modelo con ID: 94', NULL, 1, 3, '2020-07-19 08:43:38', '2020-07-19 08:43:38'),
(379, 'Se creo el fabricante con ID: 29', NULL, 1, 3, '2020-07-19 08:44:01', '2020-07-19 08:44:01'),
(380, 'Se creo el producto con ID: 73', NULL, 1, 3, '2020-07-19 08:44:18', '2020-07-19 08:44:18'),
(381, 'Se elimino la marca con ID: 23', NULL, 3, 3, '2020-07-19 08:44:41', '2020-07-19 08:44:41'),
(382, 'Se modifico el producto con ID: 27', NULL, 2, 3, '2020-07-19 08:48:32', '2020-07-19 08:48:32'),
(383, 'Se modifico el producto con ID: 28', NULL, 2, 3, '2020-07-19 08:52:35', '2020-07-19 08:52:35'),
(384, 'Se modifico el producto con ID: 28', NULL, 2, 3, '2020-07-19 08:53:50', '2020-07-19 08:53:50'),
(385, 'Se modifico el modelo con ID: 49', NULL, 2, 3, '2020-07-19 08:55:20', '2020-07-19 08:55:20'),
(386, 'Se modifico el producto con ID: 27', NULL, 2, 3, '2020-07-19 08:56:02', '2020-07-19 08:56:02'),
(387, 'Se modifico el producto con ID: 28', NULL, 2, 3, '2020-07-19 08:56:12', '2020-07-19 08:56:12'),
(388, 'Se modifico el producto con ID: 29', NULL, 2, 3, '2020-07-19 08:57:37', '2020-07-19 08:57:37'),
(389, 'Se modifico el modelo con ID: 50', NULL, 2, 3, '2020-07-19 08:58:01', '2020-07-19 08:58:01'),
(390, 'Se modifico el producto con ID: 30', NULL, 2, 3, '2020-07-19 08:59:23', '2020-07-19 08:59:23'),
(391, 'Se creo la marca con ID: 25', NULL, 1, 3, '2020-07-19 09:02:43', '2020-07-19 09:02:43'),
(392, 'Se creo el modelo con ID: 95', NULL, 1, 3, '2020-07-19 09:05:04', '2020-07-19 09:05:04'),
(393, 'Se creo el fabricante con ID: 30', NULL, 1, 3, '2020-07-19 09:05:37', '2020-07-19 09:05:37'),
(394, 'Se creo el producto con ID: 74', NULL, 1, 3, '2020-07-19 09:05:51', '2020-07-19 09:05:51'),
(395, 'Se creo el modelo con ID: 96', NULL, 1, 3, '2020-07-19 09:11:08', '2020-07-19 09:11:08'),
(396, 'Se creo el producto con ID: 75', NULL, 1, 3, '2020-07-19 09:11:21', '2020-07-19 09:11:21'),
(397, 'Se creo el modelo con ID: 97', NULL, 1, 3, '2020-07-19 09:15:12', '2020-07-19 09:15:12'),
(398, 'Se creo el producto con ID: 76', NULL, 1, 3, '2020-07-19 09:17:04', '2020-07-19 09:17:04'),
(399, 'Se creo el modelo con ID: 98', NULL, 1, 3, '2020-07-19 09:19:39', '2020-07-19 09:19:39'),
(400, 'Se creo el producto con ID: 77', NULL, 1, 3, '2020-07-19 09:20:09', '2020-07-19 09:20:09'),
(401, 'Se creo el modelo con ID: 99', NULL, 1, 3, '2020-07-19 09:29:51', '2020-07-19 09:29:51'),
(402, 'Se creo el producto con ID: 78', NULL, 1, 3, '2020-07-19 09:31:06', '2020-07-19 09:31:06'),
(403, 'Se creo el modelo con ID: 100', NULL, 1, 3, '2020-07-19 09:35:04', '2020-07-19 09:35:04'),
(404, 'Se creo el producto con ID: 79', NULL, 1, 3, '2020-07-19 09:35:23', '2020-07-19 09:35:23'),
(405, 'Se modifico el producto con ID: 78', NULL, 2, 3, '2020-07-19 09:35:51', '2020-07-19 09:35:51'),
(406, 'Se creo el modelo con ID: 101', NULL, 1, 3, '2020-07-22 05:58:27', '2020-07-22 05:58:27'),
(407, 'Se creo el producto con ID: 80', NULL, 1, 3, '2020-07-22 05:58:56', '2020-07-22 05:58:56'),
(408, 'Se creo el modelo con ID: 102', NULL, 1, 3, '2020-07-22 06:04:30', '2020-07-22 06:04:30'),
(409, 'Se creo el producto con ID: 81', NULL, 1, 3, '2020-07-22 06:05:21', '2020-07-22 06:05:21'),
(410, 'Se creo el modelo con ID: 103', NULL, 1, 3, '2020-07-22 06:07:35', '2020-07-22 06:07:35'),
(411, 'Se creo el producto con ID: 82', NULL, 1, 3, '2020-07-22 06:07:57', '2020-07-22 06:07:57'),
(412, 'Se creo el modelo con ID: 104', NULL, 1, 3, '2020-07-22 06:11:00', '2020-07-22 06:11:00'),
(413, 'Se creo el producto con ID: 83', NULL, 1, 3, '2020-07-22 06:11:21', '2020-07-22 06:11:21'),
(414, 'Se creo el modelo con ID: 105', NULL, 1, 3, '2020-07-22 06:15:46', '2020-07-22 06:15:46'),
(415, 'Se creo el producto con ID: 84', NULL, 1, 3, '2020-07-22 06:16:51', '2020-07-22 06:16:51'),
(416, 'Se creo el modelo con ID: 106', NULL, 1, 3, '2020-07-22 06:22:47', '2020-07-22 06:22:47'),
(417, 'Se creo el producto con ID: 85', NULL, 1, 3, '2020-07-22 06:23:13', '2020-07-22 06:23:13'),
(418, 'Se modifico el producto con ID: 22', NULL, 2, 3, '2020-07-22 06:28:53', '2020-07-22 06:28:53'),
(419, 'Se modifico el modelo con ID: 43', NULL, 2, 3, '2020-07-22 06:29:30', '2020-07-22 06:29:30'),
(420, 'Se creo el modelo con ID: 107', NULL, 1, 3, '2020-07-22 06:32:07', '2020-07-22 06:32:07'),
(421, 'Se creo el producto con ID: 86', NULL, 1, 3, '2020-07-22 06:32:30', '2020-07-22 06:32:30'),
(422, 'Se creo el modelo con ID: 108', NULL, 1, 3, '2020-07-22 06:38:33', '2020-07-22 06:38:33'),
(423, 'Se modifico el producto con ID: 25', NULL, 2, 3, '2020-07-22 06:39:50', '2020-07-22 06:39:50'),
(424, 'Se creo la unidad de medida con ID: 18', NULL, 1, 3, '2020-07-22 06:56:48', '2020-07-22 06:56:48'),
(425, 'Se modifico el producto con ID: 10', NULL, 2, 3, '2020-07-22 07:00:46', '2020-07-22 07:00:46'),
(426, 'Se creo el modelo con ID: 109', NULL, 1, 3, '2020-07-22 07:07:20', '2020-07-22 07:07:20'),
(427, 'Se modifico el producto con ID: 5', NULL, 2, 3, '2020-07-22 07:11:45', '2020-07-22 07:11:45'),
(428, 'Se creo el modelo con ID: 110', NULL, 1, 3, '2020-07-22 07:40:11', '2020-07-22 07:40:11'),
(429, 'Se modifico el producto con ID: 6', NULL, 2, 3, '2020-07-22 07:40:44', '2020-07-22 07:40:44'),
(430, 'Se creo el modelo con ID: 111', NULL, 1, 3, '2020-07-22 07:45:15', '2020-07-22 07:45:15'),
(431, 'Se creo el producto con ID: 87', NULL, 1, 3, '2020-07-22 07:46:16', '2020-07-22 07:46:16'),
(432, 'Se modifico el producto con ID: 87', NULL, 2, 3, '2020-07-22 07:47:26', '2020-07-22 07:47:26'),
(433, 'Se creo el modelo con ID: 112', NULL, 1, 3, '2020-07-22 07:51:10', '2020-07-22 07:51:10'),
(434, 'Se modifico el producto con ID: 7', NULL, 2, 3, '2020-07-22 07:51:28', '2020-07-22 07:51:28'),
(435, 'Se elimino el modelo con ID: 3', NULL, 3, 3, '2020-07-22 07:51:51', '2020-07-22 07:51:51'),
(436, 'Se elimino el modelo con ID: 2', NULL, 3, 3, '2020-07-22 07:51:55', '2020-07-22 07:51:55'),
(437, 'Se elimino el modelo con ID: 4', NULL, 3, 3, '2020-07-22 07:52:03', '2020-07-22 07:52:03'),
(438, 'Se elimino el modelo con ID: 8', NULL, 3, 3, '2020-07-22 07:52:12', '2020-07-22 07:52:12'),
(439, 'Se elimino el modelo con ID: 6', NULL, 3, 3, '2020-07-22 07:52:17', '2020-07-22 07:52:17'),
(440, 'Se elimino el modelo con ID: 9', NULL, 3, 3, '2020-07-22 07:52:22', '2020-07-22 07:52:22'),
(441, 'Se elimino el modelo con ID: 10', NULL, 3, 3, '2020-07-22 07:52:26', '2020-07-22 07:52:26'),
(442, 'Se elimino el modelo con ID: 11', NULL, 3, 3, '2020-07-22 07:52:31', '2020-07-22 07:52:31'),
(443, 'Se elimino el modelo con ID: 13', NULL, 3, 3, '2020-07-22 07:52:36', '2020-07-22 07:52:36'),
(444, 'Se elimino el modelo con ID: 14', NULL, 3, 3, '2020-07-22 07:52:46', '2020-07-22 07:52:46'),
(445, 'Se elimino el modelo con ID: 15', NULL, 3, 3, '2020-07-22 07:52:51', '2020-07-22 07:52:51'),
(446, 'Se elimino el modelo con ID: 16', NULL, 3, 3, '2020-07-22 07:52:55', '2020-07-22 07:52:55'),
(447, 'Se elimino el modelo con ID: 17', NULL, 3, 3, '2020-07-22 07:53:00', '2020-07-22 07:53:00'),
(448, 'Se elimino el modelo con ID: 18', NULL, 3, 3, '2020-07-22 07:53:05', '2020-07-22 07:53:05'),
(449, 'Se creo el modelo con ID: 113', NULL, 1, 3, '2020-07-22 08:03:07', '2020-07-22 08:03:07'),
(450, 'Se creo el producto con ID: 88', NULL, 1, 3, '2020-07-22 08:04:00', '2020-07-22 08:04:00'),
(451, 'Se creo el modelo con ID: 114', NULL, 1, 3, '2020-07-22 08:16:18', '2020-07-22 08:16:18'),
(452, 'Se modifico el producto con ID: 9', NULL, 2, 3, '2020-07-22 08:16:36', '2020-07-22 08:16:36'),
(453, 'Se creo el modelo con ID: 115', NULL, 1, 3, '2020-07-22 12:22:31', '2020-07-22 12:22:31'),
(454, 'Se creo el producto con ID: 89', NULL, 1, 3, '2020-07-22 12:27:14', '2020-07-22 12:27:14'),
(455, 'Se creo el modelo con ID: 116', NULL, 1, 3, '2020-07-22 12:30:54', '2020-07-22 12:30:54'),
(456, 'Se creo el modelo con ID: 117', NULL, 1, 3, '2020-07-22 12:32:34', '2020-07-22 12:32:34'),
(457, 'Se modifico el producto con ID: 8', NULL, 2, 3, '2020-07-22 12:33:03', '2020-07-22 12:33:03'),
(458, 'Se creo el producto con ID: 90', NULL, 1, 3, '2020-07-22 12:37:28', '2020-07-22 12:37:28'),
(459, 'Se creo el modelo con ID: 118', NULL, 1, 3, '2020-07-22 12:45:37', '2020-07-22 12:45:37'),
(460, 'Se creo el producto con ID: 91', NULL, 1, 3, '2020-07-22 12:46:19', '2020-07-22 12:46:19'),
(461, 'Se creo el cliente con ID: 18', NULL, 1, 2, '2020-07-31 05:44:31', '2020-07-31 05:44:31'),
(462, 'Se creo el proyecto del  con ID: 1', NULL, 1, 2, '2020-07-31 05:46:20', '2020-07-31 05:46:20'),
(463, 'Se modifico el proyecto del  con ID: 1', NULL, 2, 2, '2020-07-31 05:46:52', '2020-07-31 05:46:52'),
(464, 'Se modifico el cliente con ID: 18', NULL, 2, 2, '2020-07-31 05:54:48', '2020-07-31 05:54:48'),
(465, 'Se modifico el cliente con ID: 9', NULL, 2, 2, '2020-07-31 05:55:32', '2020-07-31 05:55:32'),
(466, 'Se modifico el cliente con ID: 9', NULL, 2, 2, '2020-07-31 06:04:22', '2020-07-31 06:04:22'),
(467, 'Se modifico el cliente con ID: 12', NULL, 2, 2, '2020-07-31 06:04:45', '2020-07-31 06:04:45'),
(468, 'Se modifico el cliente con ID: 12', NULL, 2, 2, '2020-07-31 06:19:16', '2020-07-31 06:19:16'),
(469, 'Se creo el proyecto del  con ID: 2', NULL, 1, 2, '2020-08-14 11:01:03', '2020-08-14 11:01:03'),
(470, 'Se creo el modelo con ID: 119', NULL, 1, 2, '2020-08-14 11:35:47', '2020-08-14 11:35:47'),
(471, 'Se creo el producto con ID: 92', NULL, 1, 2, '2020-08-14 11:37:51', '2020-08-14 11:37:51'),
(472, 'Se creo el modelo con ID: 120', NULL, 1, 2, '2020-08-14 11:43:20', '2020-08-14 11:43:20'),
(473, 'Se creo el producto con ID: 93', NULL, 1, 2, '2020-08-14 11:44:10', '2020-08-14 11:44:10'),
(474, 'Se modifico el producto con ID: 92', NULL, 2, 2, '2020-08-14 11:44:33', '2020-08-14 11:44:33'),
(475, 'Se creo el proveedor con ID: 2', NULL, 1, 2, '2020-08-15 05:32:46', '2020-08-15 05:32:46'),
(476, 'Se modifico el proveedor con ID: 2', NULL, 2, 2, '2020-08-15 05:44:58', '2020-08-15 05:44:58'),
(477, 'Se creo el contacto con ID: 20', NULL, 1, 2, '2020-08-21 13:18:29', '2020-08-21 13:18:29'),
(478, 'Se creo el modelo con ID: 121', NULL, 1, 2, '2020-08-21 13:23:28', '2020-08-21 13:23:28'),
(479, 'Se creo el producto con ID: 94', NULL, 1, 2, '2020-08-21 13:24:02', '2020-08-21 13:24:02'),
(480, 'Se creo el proyecto del  con ID: 3', NULL, 1, 2, '2020-08-21 13:29:18', '2020-08-21 13:29:18'),
(481, 'Se modifico el producto con ID: 94', NULL, 2, 2, '2020-08-30 14:14:17', '2020-08-30 14:14:17'),
(482, 'Se modifico el producto con ID: 24', NULL, 2, 4, '2020-09-01 13:21:57', '2020-09-01 13:21:57'),
(483, 'Se modifico el producto con ID: 24', NULL, 2, 4, '2020-09-01 13:22:06', '2020-09-01 13:22:06'),
(484, 'Se modifico el producto con ID: 57', NULL, 2, 4, '2020-09-01 13:26:05', '2020-09-01 13:26:05'),
(485, 'Se modifico el producto con ID: 5', NULL, 2, 3, '2020-09-13 05:18:38', '2020-09-13 05:18:38'),
(486, 'Se modifico el producto con ID: 5', NULL, 2, 3, '2020-09-13 05:23:19', '2020-09-13 05:23:19'),
(487, 'Se modifico el producto con ID: 13', NULL, 2, 3, '2020-09-13 05:24:44', '2020-09-13 05:24:44'),
(488, 'Se modifico el producto con ID: 8', NULL, 2, 3, '2020-09-13 05:30:01', '2020-09-13 05:30:01'),
(489, 'Se modifico el producto con ID: 90', NULL, 2, 3, '2020-09-13 05:35:06', '2020-09-13 05:35:06'),
(490, 'Se modifico el producto con ID: 6', NULL, 2, 3, '2020-09-13 05:40:15', '2020-09-13 05:40:15'),
(491, 'Se modifico el producto con ID: 7', NULL, 2, 3, '2020-09-13 05:40:24', '2020-09-13 05:40:24'),
(492, 'Se modifico el producto con ID: 9', NULL, 2, 3, '2020-09-13 05:44:58', '2020-09-13 05:44:58'),
(493, 'Se modifico el producto con ID: 89', NULL, 2, 3, '2020-09-13 05:45:30', '2020-09-13 05:45:30'),
(494, 'Se modifico el producto con ID: 88', NULL, 2, 3, '2020-09-13 05:50:49', '2020-09-13 05:50:49'),
(495, 'Se modifico el producto con ID: 54', NULL, 2, 2, '2020-09-13 13:11:36', '2020-09-13 13:11:36'),
(496, 'Se creo el modelo con ID: 122', NULL, 1, 2, '2020-09-13 13:24:39', '2020-09-13 13:24:39'),
(497, 'Se creo el producto con ID: 95', NULL, 1, 2, '2020-09-13 13:26:36', '2020-09-13 13:26:36'),
(498, 'Se modifico el producto con ID: 55', NULL, 2, 2, '2020-09-13 13:43:45', '2020-09-13 13:43:45'),
(499, 'Se modifico el proyecto del  con ID: 2', NULL, 2, 2, '2020-09-21 00:44:06', '2020-09-21 00:44:06'),
(500, 'Se creo la cotizacion de proveedor con codigo: #0001-NTWC-2020', NULL, 1, 2, '2020-11-08 04:37:49', '2020-11-08 04:37:49'),
(501, 'Se anulo la cotizacion de proveedor con codigo: #0001-NTWC-2020', NULL, 4, 2, '2020-11-08 04:39:44', '2020-11-08 04:39:44'),
(502, 'Se creo el proveedor con ID: 3', NULL, 1, 2, '2020-11-08 15:40:41', '2020-11-08 15:40:41'),
(503, 'Se modifico el proveedor con ID: 3', NULL, 2, 2, '2020-11-08 15:47:32', '2020-11-08 15:47:32'),
(504, 'Se creo el proyecto del  con ID: 4', NULL, 1, 2, '2020-11-08 15:48:59', '2020-11-08 15:48:59'),
(505, 'Se creo el producto con ID: 96', NULL, 1, 2, '2020-11-08 15:52:27', '2020-11-08 15:52:27'),
(506, 'Se modifico el producto con ID: 96', NULL, 2, 2, '2020-11-08 15:57:03', '2020-11-08 15:57:03'),
(507, 'Se modifico el proyecto del  con ID: 4', NULL, 2, 2, '2020-11-08 15:57:45', '2020-11-08 15:57:45'),
(508, 'Se creo el modelo con ID: 123', NULL, 1, 2, '2020-11-08 16:38:41', '2020-11-08 16:38:41'),
(509, 'Se creo el producto con ID: 97', NULL, 1, 2, '2020-11-08 16:39:34', '2020-11-08 16:39:34'),
(510, 'Se modifico el producto con ID: 97', NULL, 2, 2, '2020-11-08 16:40:19', '2020-11-08 16:40:19'),
(511, 'Se elimino la unidad de medida con ID: 16', NULL, 3, 2, '2020-11-08 16:41:39', '2020-11-08 16:41:39'),
(512, 'Se creo la unidad de medida con ID: 19', NULL, 1, 2, '2020-11-08 16:41:51', '2020-11-08 16:41:51'),
(513, 'Se elimino el producto con ID: 97', NULL, 3, 2, '2020-11-08 16:42:16', '2020-11-08 16:42:16'),
(514, 'Se creo el modelo con ID: 124', NULL, 1, 2, '2020-11-08 16:44:48', '2020-11-08 16:44:48'),
(515, 'Se creo el fabricante con ID: 31', NULL, 1, 2, '2020-11-08 16:46:06', '2020-11-08 16:46:06'),
(516, 'Se creo el modelo con ID: 125', NULL, 1, 2, '2020-11-08 16:48:33', '2020-11-08 16:48:33'),
(517, 'Se creo el proyecto del  con ID: 5', NULL, 1, 2, '2020-11-08 20:49:56', '2020-11-08 20:49:56'),
(518, 'Se creo el proyecto del  con ID: 6', NULL, 1, 2, '2020-11-08 20:51:46', '2020-11-08 20:51:46'),
(519, 'Se creo el proyecto del  con ID: 7', NULL, 1, 2, '2020-11-08 20:56:24', '2020-11-08 20:56:24'),
(520, 'Se creo la direccion con ID: 14', NULL, 1, 2, '2020-11-08 21:43:04', '2020-11-08 21:43:04'),
(521, 'Se creo el contacto con ID: 21', NULL, 1, 2, '2020-11-08 21:43:41', '2020-11-08 21:43:41');
INSERT INTO `registro_cambio` (`id_regcam`, `des_regcam`, `det_regcam`, `id_tipcam`, `id_col`, `created_at`, `updated_at`) VALUES
(522, 'Se creo la proforma de cliente con codigo: PROFORMA-0001', NULL, 1, 2, '2020-11-08 21:48:46', '2020-11-08 21:48:46'),
(523, 'Se creo la proforma de cliente con codigo: PROFORMA-0002', NULL, 1, 2, '2020-11-08 21:55:04', '2020-11-08 21:55:04'),
(524, 'Se creo el proyecto del  con ID: 8', NULL, 1, 2, '2020-11-08 22:14:19', '2020-11-08 22:14:19'),
(525, 'Se creo la cotizacion de cliente con codigo: #0001-NTWC-2020', NULL, 1, 2, '2020-11-08 22:20:58', '2020-11-08 22:20:58'),
(526, 'Se creo la cotizacion de proveedor con codigo: #0002-NTWC-2020', NULL, 1, 2, '2020-11-08 22:22:13', '2020-11-08 22:22:13'),
(527, 'Se creo la orden de compra con codigo: 0001-NTWC-2020', NULL, 1, 1, '2020-11-08 22:23:51', '2020-11-08 22:23:51'),
(528, 'Se creo la orden de compra con codigo: 0002-NTWC-2020', NULL, 1, 2, '2020-11-08 22:23:52', '2020-11-08 22:23:52'),
(529, 'Se anulo la orden de compra con codigo: 0001-NTWC-2020', NULL, 4, 1, '2020-11-08 22:24:22', '2020-11-08 22:24:22'),
(530, 'Se anulo la orden de compra con codigo: 0001-NTWC-2020', NULL, 4, 2, '2020-11-08 22:32:55', '2020-11-08 22:32:55'),
(531, 'Se anulo la orden de compra con codigo: 0002-NTWC-2020', NULL, 4, 2, '2020-11-08 22:32:58', '2020-11-08 22:32:58'),
(532, 'Se creo la marca con ID: 26', NULL, 1, 2, '2020-11-08 22:36:40', '2020-11-08 22:36:40'),
(533, 'Se creo el modelo con ID: 126', NULL, 1, 2, '2020-11-08 22:37:20', '2020-11-08 22:37:20'),
(534, 'Se modifico el producto con ID: 96', NULL, 2, 2, '2020-11-08 22:37:55', '2020-11-08 22:37:55'),
(535, 'Se creo la orden de compra con codigo: 0003-NTWC-2020', NULL, 1, 2, '2020-11-08 22:38:37', '2020-11-08 22:38:37'),
(536, 'Se anulo la orden de compra con codigo: 0003-NTWC-2020', NULL, 4, 2, '2020-11-08 22:39:06', '2020-11-08 22:39:06'),
(537, 'Se anulo la proforma de cliente con codigo: PROFORMA-0002', NULL, 4, 2, '2020-11-08 22:39:23', '2020-11-08 22:39:23'),
(538, 'Se anulo la proforma de cliente con codigo: PROFORMA-0001', NULL, 4, 2, '2020-11-08 22:39:27', '2020-11-08 22:39:27'),
(539, 'Se anulo la cotizacion de cliente con codigo: #0001-NTWC-2020', NULL, 4, 2, '2020-11-08 22:40:07', '2020-11-08 22:40:07'),
(540, 'Se creo la cotizacion de cliente con codigo: #0002-NTWC-2020', NULL, 1, 2, '2020-11-08 22:45:12', '2020-11-08 22:45:12'),
(541, 'Se creo la proforma de cliente con codigo: PROFORMA-0003', NULL, 1, 2, '2020-11-08 23:12:02', '2020-11-08 23:12:02'),
(542, 'Se modifico el proyecto del  con ID: 7', NULL, 2, 2, '2020-11-10 03:16:48', '2020-11-10 03:16:48'),
(543, 'Se modifico el proyecto del  con ID: 6', NULL, 2, 2, '2020-11-10 03:17:54', '2020-11-10 03:17:54'),
(544, 'Se modifico el proyecto del  con ID: 8', NULL, 2, 2, '2020-11-10 03:18:25', '2020-11-10 03:18:25'),
(545, 'Se anulo la cotizacion de cliente con codigo: #0002-NTWC-2020', NULL, 4, 2, '2020-11-10 03:22:48', '2020-11-10 03:22:48'),
(546, 'Se anulo la cotizacion de proveedor con codigo: #0002-NTWC-2020', NULL, 4, 2, '2020-11-10 03:23:08', '2020-11-10 03:23:08'),
(547, 'Se creo la marca con ID: 27', NULL, 1, 2, '2020-11-10 03:26:42', '2020-11-10 03:26:42'),
(548, 'Se creo el modelo con ID: 127', NULL, 1, 2, '2020-11-10 03:27:05', '2020-11-10 03:27:05'),
(549, 'Se creo el modelo con ID: 128', NULL, 1, 2, '2020-11-10 04:40:21', '2020-11-10 04:40:21'),
(550, 'Se creo el producto con ID: 98', NULL, 1, 2, '2020-11-10 04:41:14', '2020-11-10 04:41:14'),
(551, 'Se creo la cotizacion de cliente con codigo: #0003-NTWC-2020', NULL, 1, 2, '2020-11-10 04:47:12', '2020-11-10 04:47:12'),
(552, 'Se creo la proforma de cliente con codigo: PROFORMA-0004', NULL, 1, 2, '2020-11-10 05:04:52', '2020-11-10 05:04:52'),
(553, 'Se anulo la cotizacion de cliente con codigo: #0003-NTWC-2020', NULL, 4, 2, '2020-11-11 03:02:04', '2020-11-11 03:02:04'),
(554, 'Se creo la cotizacion de cliente con codigo: #0004-NTWC-2020', NULL, 1, 2, '2020-11-11 03:04:09', '2020-11-11 03:04:09'),
(555, 'Se creo la proforma de cliente con codigo: PROFORMA-0005', NULL, 1, 2, '2020-11-11 03:15:01', '2020-11-11 03:15:01'),
(556, 'Se anulo la proforma de cliente con codigo: PROFORMA-0003', NULL, 4, 2, '2020-11-11 03:15:14', '2020-11-11 03:15:14'),
(557, 'Se anulo la proforma de cliente con codigo: PROFORMA-0005', NULL, 4, 2, '2020-11-11 03:15:19', '2020-11-11 03:15:19'),
(558, 'Se anulo la proforma de cliente con codigo: PROFORMA-0004', NULL, 4, 2, '2020-11-11 03:16:39', '2020-11-11 03:16:39'),
(559, 'Se modifico el cliente con ID: 6', NULL, 2, 2, '2020-11-11 05:35:22', '2020-11-11 05:35:22'),
(560, 'Se modifico el cliente con ID: 6', NULL, 2, 2, '2020-11-11 05:35:22', '2020-11-11 05:35:22'),
(561, 'Se modifico el cliente con ID: 6', NULL, 2, 2, '2020-11-11 05:35:22', '2020-11-11 05:35:22'),
(562, 'Se modifico el cliente con ID: 6', NULL, 2, 2, '2020-11-11 05:37:49', '2020-11-11 05:37:49'),
(563, 'Se modifico el cliente con ID: 6', NULL, 2, 2, '2020-11-11 05:38:13', '2020-11-11 05:38:13'),
(564, 'Se modifico el cliente con ID: 6', NULL, 2, 2, '2020-11-11 05:38:38', '2020-11-11 05:38:38'),
(565, 'Se modifico el cliente con ID: 7', NULL, 2, 2, '2020-11-11 05:40:50', '2020-11-11 05:40:50'),
(566, 'Se modifico el cliente con ID: 7', NULL, 2, 2, '2020-11-11 05:47:36', '2020-11-11 05:47:36'),
(567, 'Se modifico el cliente con ID: 8', NULL, 2, 2, '2020-11-11 05:48:25', '2020-11-11 05:48:25'),
(568, 'Se modifico el cliente con ID: 9', NULL, 2, 2, '2020-11-11 05:48:58', '2020-11-11 05:48:58'),
(569, 'Se modifico el cliente con ID: 12', NULL, 2, 2, '2020-11-11 05:50:45', '2020-11-11 05:50:45'),
(570, 'Se modifico el cliente con ID: 12', NULL, 2, 2, '2020-11-11 05:50:57', '2020-11-11 05:50:57'),
(571, 'Se modifico el cliente con ID: 15', NULL, 2, 2, '2020-11-11 05:51:50', '2020-11-11 05:51:50'),
(572, 'Se modifico el cliente con ID: 18', NULL, 2, 2, '2020-11-11 05:52:39', '2020-11-11 05:52:39'),
(573, 'Se modifico el cliente con ID: 6', NULL, 2, 2, '2020-11-11 05:56:31', '2020-11-11 05:56:31'),
(574, 'Se creo el proyecto del  con ID: 9', NULL, 1, 2, '2020-11-12 02:22:16', '2020-11-12 02:22:16'),
(575, 'Se creo la marca con ID: 28', NULL, 1, 2, '2020-11-12 02:47:37', '2020-11-12 02:47:37'),
(576, 'Se creo el modelo con ID: 129', NULL, 1, 2, '2020-11-12 02:48:38', '2020-11-12 02:48:38'),
(577, 'Se creo el fabricante con ID: 32', NULL, 1, 2, '2020-11-12 02:49:31', '2020-11-12 02:49:31'),
(578, 'Se creo el producto con ID: 99', NULL, 1, 2, '2020-11-12 02:49:50', '2020-11-12 02:49:50'),
(579, 'Se creo la marca con ID: 29', NULL, 1, 2, '2020-11-12 02:55:25', '2020-11-12 02:55:25'),
(580, 'Se creo el modelo con ID: 130', NULL, 1, 2, '2020-11-12 02:55:42', '2020-11-12 02:55:42'),
(581, 'Se creo el fabricante con ID: 33', NULL, 1, 2, '2020-11-12 02:56:11', '2020-11-12 02:56:11'),
(582, 'Se creo el producto con ID: 100', NULL, 1, 2, '2020-11-12 02:56:18', '2020-11-12 02:56:18'),
(583, 'Se creo el modelo con ID: 131', NULL, 1, 2, '2020-11-12 03:01:18', '2020-11-12 03:01:18'),
(584, 'Se creo el producto con ID: 101', NULL, 1, 2, '2020-11-12 03:01:36', '2020-11-12 03:01:36'),
(585, 'Se creo la cotizacion de cliente con codigo: #0005-NTWC-2020', NULL, 1, 2, '2020-11-12 03:48:12', '2020-11-12 03:48:12'),
(586, 'Se creo la proforma de cliente con codigo: PROFORMA-0006', NULL, 1, 2, '2020-11-12 04:07:46', '2020-11-12 04:07:46'),
(587, 'Se modifico el cliente con ID: 6', NULL, 2, 3, '2020-11-12 23:17:29', '2020-11-12 23:17:29'),
(588, 'Se modifico el producto con ID: 5', NULL, 2, 3, '2020-11-17 20:58:25', '2020-11-17 20:58:25'),
(589, 'Se creo la unidad de medida con ID: 20', NULL, 1, 3, '2020-11-17 20:59:23', '2020-11-17 20:59:23'),
(590, 'Se creo la unidad de medida con ID: 21', NULL, 1, 3, '2020-11-17 21:00:27', '2020-11-17 21:00:27'),
(591, 'Se creo la unidad de medida con ID: 22', NULL, 1, 3, '2020-11-17 21:01:56', '2020-11-17 21:01:56'),
(592, 'Se modifico el producto con ID: 5', NULL, 2, 3, '2020-11-17 21:02:27', '2020-11-17 21:02:27'),
(593, 'Se modifico el proveedor con ID: 1', NULL, 2, 3, '2020-11-17 21:04:54', '2020-11-17 21:04:54'),
(594, 'Se modifico la unidad de medida con ID: 1', NULL, 2, 3, '2020-11-17 21:06:57', '2020-11-17 21:06:57'),
(595, 'Se modifico la unidad de medida con ID: 2', NULL, 2, 3, '2020-11-17 21:07:19', '2020-11-17 21:07:19'),
(596, 'Se modifico la unidad de medida con ID: 2', NULL, 2, 3, '2020-11-17 21:07:29', '2020-11-17 21:07:29'),
(597, 'Se modifico la unidad de medida con ID: 10', NULL, 2, 3, '2020-11-17 21:07:43', '2020-11-17 21:07:43'),
(598, 'Se modifico la unidad de medida con ID: 11', NULL, 2, 3, '2020-11-17 21:08:02', '2020-11-17 21:08:02'),
(599, 'Se modifico la unidad de medida con ID: 7', NULL, 2, 3, '2020-11-17 21:08:15', '2020-11-17 21:08:15'),
(600, 'Se modifico la unidad de medida con ID: 6', NULL, 2, 3, '2020-11-17 21:08:27', '2020-11-17 21:08:27'),
(601, 'Se modifico la unidad de medida con ID: 17', NULL, 2, 3, '2020-11-17 21:09:03', '2020-11-17 21:09:03'),
(602, 'Se elimino la unidad de medida con ID: 19', NULL, 3, 3, '2020-11-17 21:09:22', '2020-11-17 21:09:22'),
(603, 'Se elimino la unidad de medida con ID: 22', NULL, 3, 3, '2020-11-17 21:09:31', '2020-11-17 21:09:31'),
(604, 'Se modifico el usuario con ID: 3', NULL, 2, 3, '2020-11-17 21:10:50', '2020-11-17 21:10:50'),
(605, 'Se modifico el usuario con ID: 2', NULL, 2, 3, '2020-11-17 21:11:13', '2020-11-17 21:11:13'),
(606, 'Se modifico el usuario con ID: 4', NULL, 2, 3, '2020-11-17 21:11:49', '2020-11-17 21:11:49'),
(607, 'Se modifico el usuario con ID: 2', NULL, 2, 3, '2020-11-17 21:12:14', '2020-11-17 21:12:14'),
(608, 'Se modifico el fabricante con ID: 4', NULL, 2, 3, '2020-11-17 21:18:15', '2020-11-17 21:18:15'),
(609, 'Se modifico el fabricante con ID: 4', NULL, 2, 3, '2020-11-17 21:18:22', '2020-11-17 21:18:22'),
(610, 'Se modifico el modelo con ID: 12', NULL, 2, 3, '2020-11-17 21:18:35', '2020-11-17 21:18:35'),
(611, 'Se modifico el modelo con ID: 12', NULL, 2, 3, '2020-11-17 21:18:44', '2020-11-17 21:18:44'),
(612, 'Se creo el proyecto del  con ID: 10', NULL, 1, 2, '2020-11-20 19:33:08', '2020-11-20 19:33:08'),
(613, 'Se creo el modelo con ID: 132', NULL, 1, 2, '2020-11-21 04:52:14', '2020-11-21 04:52:14'),
(614, 'Se creo el producto con ID: 102', NULL, 1, 2, '2020-11-21 04:52:41', '2020-11-21 04:52:41'),
(615, 'Se modifico el producto con ID: 102', NULL, 2, 2, '2020-11-21 05:01:22', '2020-11-21 05:01:22'),
(616, 'Se creo el modelo con ID: 133', NULL, 1, 2, '2020-11-21 05:06:51', '2020-11-21 05:06:51'),
(617, 'Se creo el producto con ID: 103', NULL, 1, 2, '2020-11-21 05:07:19', '2020-11-21 05:07:19'),
(618, 'Se modifico el proyecto del  con ID: 10', NULL, 2, 2, '2020-11-21 05:09:04', '2020-11-21 05:09:04'),
(619, 'Se creo la cotizacion de proveedor con codigo: #0003-NTWC-2020', NULL, 1, 2, '2020-11-21 05:12:49', '2020-11-21 05:12:49'),
(620, 'Se creo la cotizacion de proveedor con codigo: #0004-NTWC-2020', NULL, 1, 2, '2020-11-21 05:17:37', '2020-11-21 05:17:37'),
(621, 'Se creo el contacto con ID: 22', NULL, 1, 2, '2020-11-21 05:31:55', '2020-11-21 05:31:55'),
(622, 'Se creo la direccion con ID: 17', NULL, 1, 2, '2020-11-21 05:34:31', '2020-11-21 05:34:31'),
(623, 'Se creo la cotizacion de cliente con codigo: #0006-NTWC-2020', NULL, 1, 2, '2020-11-21 05:36:54', '2020-11-21 05:36:54'),
(624, 'Se creo la proforma de cliente con codigo: PROFORMA-0007', NULL, 1, 2, '2020-11-21 05:47:37', '2020-11-21 05:47:37'),
(625, 'Se creo el modelo con ID: 134', NULL, 1, 2, '2020-11-22 05:27:24', '2020-11-22 05:27:24'),
(626, 'Se creo el producto con ID: 104', NULL, 1, 2, '2020-11-22 05:27:52', '2020-11-22 05:27:52'),
(627, 'Se creo el modelo con ID: 135', NULL, 1, 2, '2020-11-22 05:32:19', '2020-11-22 05:32:19'),
(628, 'Se creo el producto con ID: 105', NULL, 1, 2, '2020-11-22 05:32:52', '2020-11-22 05:32:52'),
(629, 'Se creo el modelo con ID: 136', NULL, 1, 2, '2020-11-22 05:57:05', '2020-11-22 05:57:05'),
(630, 'Se creo el producto con ID: 106', NULL, 1, 2, '2020-11-22 05:57:48', '2020-11-22 05:57:48'),
(631, 'Se creo el modelo con ID: 137', NULL, 1, 2, '2020-11-22 06:03:05', '2020-11-22 06:03:05'),
(632, 'Se creo el producto con ID: 107', NULL, 1, 2, '2020-11-22 06:03:53', '2020-11-22 06:03:53'),
(633, 'Se modifico el modelo con ID: 137', NULL, 2, 2, '2020-11-22 06:05:19', '2020-11-22 06:05:19'),
(634, 'Se creo la marca con ID: 30', NULL, 1, 2, '2020-11-22 06:10:48', '2020-11-22 06:10:48'),
(635, 'Se modifico la marca con ID: 30', NULL, 2, 2, '2020-11-22 06:11:01', '2020-11-22 06:11:01'),
(636, 'Se creo el modelo con ID: 138', NULL, 1, 2, '2020-11-22 06:37:29', '2020-11-22 06:37:29'),
(637, 'Se creo el producto con ID: 108', NULL, 1, 2, '2020-11-22 06:37:58', '2020-11-22 06:37:58'),
(638, 'Se modifico el producto con ID: 108', NULL, 2, 2, '2020-11-22 06:38:54', '2020-11-22 06:38:54'),
(639, 'Se modifico el producto con ID: 107', NULL, 2, 2, '2020-11-26 04:02:11', '2020-11-26 04:02:11'),
(640, 'Se modifico el proveedor con ID: 2', NULL, 2, 2, '2020-12-27 20:39:34', '2020-12-27 20:39:34'),
(641, 'Se creo el proveedor con ID: 4', NULL, 1, 2, '2020-12-27 20:49:55', '2020-12-27 20:49:55'),
(642, 'Se modifico el proveedor con ID: 4', NULL, 2, 2, '2020-12-27 20:53:02', '2020-12-27 20:53:02'),
(643, 'Se modifico el proyecto del  con ID: 10', NULL, 2, 2, '2020-12-27 20:53:19', '2020-12-27 20:53:19');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `seccion_pdfs`
--

CREATE TABLE `seccion_pdfs` (
  `id_sec` bigint(20) UNSIGNED NOT NULL,
  `des_sec` varchar(200) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `est_reg` char(2) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'A',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `seccion_pdfs`
--

INSERT INTO `seccion_pdfs` (`id_sec`, `des_sec`, `est_reg`, `created_at`, `updated_at`) VALUES
(1, 'GASTOS INDIRECTOS', 'A', '2020-11-10 04:51:40', '2020-11-10 04:51:40'),
(2, 'Mano de Obra Certificada', 'A', '2020-11-08 21:44:33', '2020-11-08 21:44:33'),
(3, 'Mano de Obra Calificada', 'A', '2020-11-08 22:16:16', '2020-11-08 22:16:16'),
(4, 'MATERIALES DE CABLEADO', 'A', '2020-11-10 04:51:00', '2020-11-10 04:51:00'),
(5, 'ETIQUETADO', 'A', '2020-11-10 04:51:13', '2020-11-10 04:51:13');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `sellers`
--

CREATE TABLE `sellers` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `solicitud_cotizacion_cliente`
--

CREATE TABLE `solicitud_cotizacion_cliente` (
  `solcli_id` bigint(20) UNSIGNED NOT NULL,
  `solcli_cod` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL,
  `solcli_fec` datetime DEFAULT NULL,
  `id_proy` bigint(20) UNSIGNED DEFAULT NULL,
  `solcli_proy_nom` varchar(250) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `solcli_proy_cod` char(20) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `id_cli` bigint(20) UNSIGNED DEFAULT NULL,
  `solcli_cli_nom` varchar(200) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `solcli_cli_numdoc` char(11) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `solcli_cli_tipdoc` char(20) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `solcli_cli_dir` varchar(200) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `solcli_cli_id_dir` int(11) DEFAULT NULL,
  `solcli_cli_con` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `solcli_cli_id_con` int(11) DEFAULT NULL,
  `id_col` bigint(20) UNSIGNED DEFAULT NULL,
  `solcli_col_nom` varchar(200) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `est_reg` char(2) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `solicitud_cotizacion_cliente`
--

INSERT INTO `solicitud_cotizacion_cliente` (`solcli_id`, `solcli_cod`, `solcli_fec`, `id_proy`, `solcli_proy_nom`, `solcli_proy_cod`, `id_cli`, `solcli_cli_nom`, `solcli_cli_numdoc`, `solcli_cli_tipdoc`, `solcli_cli_dir`, `solcli_cli_id_dir`, `solcli_cli_con`, `solcli_cli_id_con`, `id_col`, `solcli_col_nom`, `est_reg`, `created_at`, `updated_at`) VALUES
(1, '#0001-NTWC-2020', '2020-11-08 12:20:57', 4, 'MANTENIMIENTO PREVENTIVO UPS TRIFASICO POTENCIA 20KVA MARCA LIBERTY - VERTIV', 'NTWC-P-0004', 11, 'M3 INGENIERIA PERU S.A.C.', '20545451698', 'RUC', 'Citi Center', 14, 'Alexander Villena', 21, 2, 'Oscar HilburgDaza Rodriguez', 'AN', '2020-11-08 22:20:57', '2020-11-08 22:40:07'),
(2, '#0002-NTWC-2020', '2020-11-08 12:45:12', 8, 'SISTEMA DE PUESTA A TIERRA  P.A.T', 'NTWC-P-0008', 8, 'RACIONALIZACION EMPRESARIAL S.A.', '20100814162', 'RUC', 'CAR. Variante Uchumayo KM. 5.5 (El Cural) Cerro Colorado', 8, 'Percy Chambi Vargas', 15, 2, 'Oscar HilburgDaza Rodriguez', 'AN', '2020-11-08 22:45:12', '2020-11-10 03:22:48'),
(3, '#0003-NTWC-2020', '2020-11-09 18:47:12', 5, 'IMPLEMENTACION DE RED LAN RACIEMSA SEDE JULIACA', 'NTWC-P-0005', 8, 'RACIONALIZACION EMPRESARIAL S.A.', '20100814162', 'RUC', 'CAR. Variante Uchumayo KM. 5.5 (El Cural) Cerro Colorado', 8, 'Percy Chambi Vargas', 15, 2, 'Oscar HilburgDaza Rodriguez', 'AN', '2020-11-10 04:47:12', '2020-11-11 03:02:04'),
(4, '#0004-NTWC-2020', '2020-11-10 17:04:08', 8, 'SISTEMA DE PUESTA A TIERRA  P.A.T RACIENSA SEDE JULIACA', 'NTWC-P-0008', 8, 'RACIONALIZACION EMPRESARIAL S.A.', '20100814162', 'RUC', 'CAR. Variante Uchumayo KM. 5.5 (El Cural) Cerro Colorado', 8, 'Percy Chambi Vargas', 15, 2, 'Oscar HilburgDaza Rodriguez', 'A', '2020-11-11 03:04:08', '2020-11-11 03:04:08'),
(5, '#0005-NTWC-2020', '2020-11-11 17:48:12', 9, 'INSTALACION DE NVR AXIS, WORKSTATION AXIS, RAKEO DE MONITORES', 'NTWC-P-0009', 7, 'LOGISTICA DE QUIMICOS DEL SUR S.A.C.', '20513398787', 'RUC', 'Av. Term.Portuario Matarani S/N', 16, 'Manuel Delgado', 20, 2, 'Oscar HilburgDaza Rodriguez', 'A', '2020-11-12 03:48:12', '2020-11-12 03:48:12'),
(6, '#0006-NTWC-2020', '2020-11-20 19:36:53', 10, 'PATCH CORD CAT6A SHIELDED S/FTP/SHZ COLOR AZUL DE 2/3MT', 'NTWC-P-0010', 7, 'LOGISTICA DE QUIMICOS DEL SUR S.A.C.', '20513398787', 'RUC', 'Av. Term.Portuario Matarani S/N', 16, 'Lenin Munayco Aroste', 22, 2, 'Oscar HilburgDaza Rodriguez', 'A', '2020-11-21 05:36:53', '2020-11-21 05:36:53');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `solicitud_cotizacion_cliente_det`
--

CREATE TABLE `solicitud_cotizacion_cliente_det` (
  `solclidet_id` bigint(20) UNSIGNED NOT NULL,
  `solcli_id` bigint(20) UNSIGNED DEFAULT NULL,
  `solclidet_prod_serv` int(11) DEFAULT NULL,
  `solclidet_des` varchar(2000) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `id_prod` bigint(20) UNSIGNED DEFAULT NULL,
  `solclidet_prod_can` double(8,2) DEFAULT NULL,
  `solclidet_prod_codint` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `solclidet_prod_numpar` varchar(200) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `solclidet_prod_fabr` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `solclidet_prod_marc` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `solclidet_prod_unimed` char(5) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `solclidet_prod_stock` double(8,2) DEFAULT NULL,
  `est_reg` char(2) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `solicitud_cotizacion_cliente_det`
--

INSERT INTO `solicitud_cotizacion_cliente_det` (`solclidet_id`, `solcli_id`, `solclidet_prod_serv`, `solclidet_des`, `id_prod`, `solclidet_prod_can`, `solclidet_prod_codint`, `solclidet_prod_numpar`, `solclidet_prod_fabr`, `solclidet_prod_marc`, `solclidet_prod_unimed`, `solclidet_prod_stock`, `est_reg`) VALUES
(1, 1, 1, 'Servicio de Mantenimiento Preventivo de UPS Trifásico  Potencia 40 KVA  MODELO ITA 2  MARCA LIBERTY - VERTIV', 96, 1.00, NULL, 'MANTOUPSTRIF', NULL, NULL, NULL, NULL, 'A'),
(2, 2, 2, 'SISTEMA PUESTA A TIERRA P.A.T.(POZO A TIERRA) VERTICAL  MENOR A 8 OHMIOS', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'A'),
(3, 3, 1, 'CABLE CAT6 4P UTP 24AWG LSZH WT (305M) COLOR WHITE', 5, 3.00, 'CMZ-00424UTP-6U', '1427070-2', 'COMMSCOPE', 'COMMSCOPE', 'M', NULL, 'A'),
(4, 3, 1, 'MODULO CONECTOR SERIE SL CAT6 U/UTP, COLOR AZUL', 6, 58.00, '209207', '1375055-6', 'COMMSCOPE', 'COMMSCOPE', 'Pza', NULL, 'A'),
(5, 3, 1, 'CABLE DE PACHEO CAT6 U/UTP NO-PLENUM CM, COLOR AZUL 10 PIES', 9, 42.00, 'MM10-NETC6-06', 'NPC06UVDB-BL010F', 'COMMSCOPE', 'COMMSCOPE', 'Pza', NULL, 'A'),
(6, 3, 2, 'PRUEBA COVID-19', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'A'),
(7, 4, 2, 'SISTEMA DE PUESTA A TIERRA P.A.T.  VERTICAL MENOR A 8 OHMIOS', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'A'),
(8, 5, 2, 'CAPACITACION   AXIS CAMARA STATION  NIVEL USUARIO', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'A'),
(9, 5, 2, 'CONFIGURACION DE CAMARAS AXIS TIPO FIJAS EN NVR', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'A'),
(10, 5, 2, 'CONFIGURACION DE CAMARAS AXIS EN NVR', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'A'),
(11, 5, 2, 'CONFIGURACION DE CAMARA AXIS PANORAMICA EN NVR', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'A'),
(12, 5, 2, 'CONFIGURACION DE RUTINAS DE VIGILANCIA EN CAMARAS AXIS PTZ', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'A'),
(13, 5, 2, 'MOVILIZACION DE PERSONAL AQP-MAT-AQP', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'A'),
(14, 5, 2, 'HOSPEDAJE MOLLENDO', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'A'),
(15, 5, 2, 'ALIMENTACION MATARANI', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'A'),
(16, 5, 2, 'STARTUP DE NVR AXIS S1148 24TB CAMARA STATION', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'A'),
(17, 5, 2, 'STARTUP VIDEO SURVEILLANCE CONTROL BOARD', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'A'),
(18, 5, 2, 'PRUEBA DE DESCARTE RAPIDA COVID-19', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'A'),
(19, 5, 2, 'POLIZA DE ASEGURAMIENTO SCTR, SALUD, PENSION', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'A'),
(20, 5, 1, 'CABLE HDMI 4K 2.0 REFORZADO 5MT', 100, 3.00, 'NTWC0038975', 'HD4K20-AFG', 'VENTION', 'VENTION', 'Pza', NULL, 'A'),
(21, 5, 1, 'Mini Display Port Dp A Hdmi Cable Adaptador P/mac/hp y Dell', 99, 2.00, 'NTWC004587', 'FOSDPMIHD4K', 'FOSMON', 'FOSMON', 'Pza', NULL, 'A'),
(22, 5, 1, 'RACK DE PARED PARA MONITOR/TV DE 55\" A 60\"', 101, 2.00, 'NTWC159753', 'RAC-4721', NULL, NULL, 'Pza', NULL, 'A'),
(23, 5, 2, 'ENSAMBLAJE, PRUEBAS, ACTUALIZACION DE FIRMWARE SERVIDOR HP PROLIANT DL380 GEN10', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'A'),
(24, 5, 2, 'PRUEBA DE DESCARTE RAPIDA COVID-19, ACTA EPIDIMIOLOGICA (SERVICIO MANTENIMIENTO PREVENTIVO EQUIPOS PUNTO NASH PUERTO TISUR)', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'A'),
(25, 6, 1, 'TX6A 10Gig SHIELDED S/FTP PATCH CORD T568B LSZH/CM 26AWG  STRANDED COLOR BLUE 2MT', 102, 20.00, NULL, 'STP6X2MBU', 'PANDUIT', 'PANDUIT', 'Pza', NULL, 'A'),
(26, 6, 1, 'TX6 10Gig SHIELDED S/FTP PATC CORD T568B LSZH/CM  26AWG STRANDED BLUE 3MT 10FT', 103, 20.00, NULL, 'STP6X3MBU', 'PANDUIT', 'PANDUIT', 'Pza', NULL, 'A');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tipo_cambio`
--

CREATE TABLE `tipo_cambio` (
  `id_tipcam` bigint(20) UNSIGNED NOT NULL,
  `des_tipcam` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `tipo_cambio`
--

INSERT INTO `tipo_cambio` (`id_tipcam`, `des_tipcam`) VALUES
(1, 'Crear'),
(2, 'Modificar'),
(3, 'Eliminar'),
(4, 'Anular');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tipo_documento`
--

CREATE TABLE `tipo_documento` (
  `id_tipdoc` bigint(20) UNSIGNED NOT NULL,
  `cod_tipdoc` char(2) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `des_tipdoc` varchar(20) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `est_reg` char(2) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `tipo_documento`
--

INSERT INTO `tipo_documento` (`id_tipdoc`, `cod_tipdoc`, `des_tipdoc`, `est_reg`, `created_at`, `updated_at`) VALUES
(1, NULL, 'DNI', 'A', '2020-06-08 19:47:25', '2020-06-08 19:47:25'),
(2, NULL, 'CARNET EXTRANGERIA', 'E', '2020-06-08 22:01:04', '2020-06-26 20:33:36'),
(3, NULL, 'RUC', 'A', '2020-06-12 18:16:21', '2020-06-12 18:16:21');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `transportista`
--

CREATE TABLE `transportista` (
  `id_transportista` bigint(20) UNSIGNED NOT NULL,
  `TipoDoc` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `NumDoc` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `RznSocial` varchar(20) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `Placa` varchar(10) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `ChoferTipoDoc` varchar(2) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `ChoferDoc` varchar(20) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `est_reg` char(2) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `unidad_medida`
--

CREATE TABLE `unidad_medida` (
  `id_unimed` bigint(20) UNSIGNED NOT NULL,
  `nom_unimed` char(5) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `des_unimed` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `est_reg` char(2) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `unidad_medida`
--

INSERT INTO `unidad_medida` (`id_unimed`, `nom_unimed`, `des_unimed`, `est_reg`, `created_at`, `updated_at`) VALUES
(1, 'Kgm', 'Kilogramo', 'A', '2020-06-08 20:31:56', '2020-11-17 21:06:57'),
(2, 'Doc', 'Docena', 'A', '2020-06-12 10:28:07', '2020-11-17 21:07:29'),
(3, 'Bls', 'Bolsa', 'A', '2020-06-12 10:30:32', '2020-06-23 22:16:34'),
(4, '126', 'DOCENA POR 10**6', 'E', '2020-06-12 10:31:05', '2020-06-23 22:16:42'),
(5, 'M 6', 'METRO POR 10**6', 'E', '2020-06-12 10:31:34', '2020-06-23 22:11:44'),
(6, 'Mts', 'Metro', 'A', '2020-06-23 21:47:20', '2020-11-17 21:08:27'),
(7, 'Und', 'Unidad', 'A', '2020-06-23 22:07:27', '2020-11-17 21:08:15'),
(8, 'Pza', 'Pieza', 'A', '2020-06-23 22:10:38', '2020-06-23 22:16:58'),
(9, 'Ft', 'Pie', 'A', '2020-06-23 22:12:50', '2020-06-23 22:17:07'),
(10, 'mm', 'Milímetro', 'A', '2020-06-23 22:13:36', '2020-11-17 21:07:43'),
(11, 'Pulg', 'Pulgadas', 'A', '2020-06-23 22:13:51', '2020-11-17 21:08:02'),
(12, 'Lb', 'Libra', 'A', '2020-06-23 22:16:10', '2020-06-23 22:17:36'),
(13, 'RLL', 'Rollo', 'A', '2020-06-23 22:21:11', '2020-06-23 22:21:11'),
(14, 'RLL', 'ROLLO', 'E', '2020-06-25 22:29:08', '2020-06-25 22:29:19'),
(15, 'GLB', 'GLOBAL', 'A', '2020-06-26 19:53:20', '2020-06-26 19:53:20'),
(16, 'AXIS', NULL, 'E', '2020-07-07 16:30:57', '2020-11-08 16:41:39'),
(17, 'KIT', 'Juego', 'A', '2020-07-14 09:20:45', '2020-11-17 21:09:03'),
(18, 'BX', 'CAJA', 'A', '2020-07-22 01:56:48', '2020-07-22 01:56:48'),
(19, 'UND', 'UNIDAD', 'E', '2020-11-08 16:41:51', '2020-11-17 21:09:22'),
(20, 'ROLLO', 'RLL', 'A', '2020-11-17 20:59:23', '2020-11-17 20:59:23'),
(21, 'UND', 'UNIDAD', 'A', '2020-11-17 21:00:27', '2020-11-17 21:00:27'),
(22, 'RLL', 'ROLLO', 'E', '2020-11-17 21:01:56', '2020-11-17 21:09:31');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--

CREATE TABLE `users` (
  `id_col` bigint(20) UNSIGNED NOT NULL,
  `nom_col` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `ape_col` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `num_doc_col` char(8) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `cod_col` varchar(20) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `cel_col` varchar(10) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `id_tipdoc` bigint(20) UNSIGNED DEFAULT NULL,
  `id_car` bigint(20) UNSIGNED DEFAULT NULL,
  `est_reg` char(2) COLLATE utf8mb4_unicode_ci NOT NULL,
  `firma` blob DEFAULT NULL,
  `remember_token` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `users`
--

INSERT INTO `users` (`id_col`, `nom_col`, `ape_col`, `num_doc_col`, `email`, `password`, `cod_col`, `cel_col`, `id_tipdoc`, `id_car`, `est_reg`, `firma`, `remember_token`, `email_verified_at`, `created_at`, `updated_at`) VALUES
(1, 'Admin', 'General', '11111111', 'admin@admin.com', '$2y$10$deB7EKiHnpewcAVyNoVv5.7jD8dmaVdqvp0W1hXsZ1HkTpiHKXLNe', NULL, NULL, NULL, NULL, 'SU', NULL, NULL, NULL, NULL, '2020-12-30 13:36:14'),
(2, 'Oscar Hilburg', 'Daza Rodriguez', '29466783', 'oscar.daza@ntwcontrol.com', '$2y$10$EhUNlSLbRcXpc6CuX93ywuIP1dJbuGkS0CjpXELGo0n39YsIgFz1O', '100', '987740664', 1, 3, 'A', NULL, NULL, NULL, '2020-06-20 00:59:49', '2020-11-17 21:12:14'),
(3, 'Elida Pilar', 'Ramos Vargas', '29314522', 'elida.ramos@ntwcontrol.com', '$2y$10$x8tQKv1qgUd77wMDbnR.8urlnFOCA3mE7FxQOHQ7Ecp9aCnPpgYPK', '003', '950313013', 1, 2, 'A', NULL, NULL, NULL, '2020-06-20 01:11:04', '2020-11-17 21:10:50'),
(4, 'Hilbourg Ernesto', 'Daza Ramos', '47275751', 'ernesto.daza@ntwcontrol.com', '$2y$10$RP4UAFHexrvHoRWgKQcJQ.2mOX8/1lgLjlD3tu8uUj8dMhl.7VXNS', '002', '986999021', 1, 1, 'A', NULL, NULL, NULL, '2020-06-20 01:25:37', '2020-11-17 21:11:49');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `anticipos`
--
ALTER TABLE `anticipos`
  ADD PRIMARY KEY (`id_anticipos`),
  ADD KEY `anticipos_id_factura_foreign` (`id_factura`);

--
-- Indices de la tabla `cargo`
--
ALTER TABLE `cargo`
  ADD PRIMARY KEY (`id_car`);

--
-- Indices de la tabla `cargos`
--
ALTER TABLE `cargos`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `cliente`
--
ALTER TABLE `cliente`
  ADD PRIMARY KEY (`id_cli`),
  ADD KEY `cliente_id_tipdoc_foreign` (`id_tipdoc`);

--
-- Indices de la tabla `cliente_contacto`
--
ALTER TABLE `cliente_contacto`
  ADD PRIMARY KEY (`id_cli_con`),
  ADD KEY `cliente_contacto_id_cli_foreign` (`id_cli`);

--
-- Indices de la tabla `cliente_direccion`
--
ALTER TABLE `cliente_direccion`
  ADD PRIMARY KEY (`id_cli_dir`),
  ADD KEY `cliente_direccion_id_cli_foreign` (`id_cli`);

--
-- Indices de la tabla `cotizacion_proveedor`
--
ALTER TABLE `cotizacion_proveedor`
  ADD PRIMARY KEY (`cotprov_id`),
  ADD UNIQUE KEY `cotizacion_proveedor_cotprov_cod_unique` (`cotprov_cod`),
  ADD KEY `cotizacion_proveedor_solcli_id_foreign` (`solcli_id`),
  ADD KEY `cotizacion_proveedor_id_proy_foreign` (`id_proy`),
  ADD KEY `cotizacion_proveedor_id_cli_foreign` (`id_cli`),
  ADD KEY `cotizacion_proveedor_id_prov_foreign` (`id_prov`),
  ADD KEY `cotizacion_proveedor_id_col_foreign` (`id_col`);

--
-- Indices de la tabla `cotizacion_proveedor_det`
--
ALTER TABLE `cotizacion_proveedor_det`
  ADD PRIMARY KEY (`cotprovdet_id`),
  ADD KEY `cotizacion_proveedor_det_cotprov_id_foreign` (`cotprov_id`),
  ADD KEY `cotizacion_proveedor_det_id_prod_foreign` (`id_prod`);

--
-- Indices de la tabla `descuentos`
--
ALTER TABLE `descuentos`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `direccion_entregas`
--
ALTER TABLE `direccion_entregas`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `documento_relacionados`
--
ALTER TABLE `documento_relacionados`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `empresa`
--
ALTER TABLE `empresa`
  ADD PRIMARY KEY (`id_emp`),
  ADD KEY `empresa_id_tipdoc_foreign` (`id_tipdoc`);

--
-- Indices de la tabla `envio`
--
ALTER TABLE `envio`
  ADD PRIMARY KEY (`id_envio`),
  ADD KEY `envio_id_transportista_foreign` (`id_transportista`);

--
-- Indices de la tabla `fabricante`
--
ALTER TABLE `fabricante`
  ADD PRIMARY KEY (`id_fab`);

--
-- Indices de la tabla `facturas`
--
ALTER TABLE `facturas`
  ADD PRIMARY KEY (`id_factura`),
  ADD KEY `facturas_solcli_id_foreign` (`solcli_id`),
  ADD KEY `facturas_id_cli_foreign` (`id_cli`),
  ADD KEY `facturas_id_emp_foreign` (`id_emp`),
  ADD KEY `facturas_id_legends_foreign` (`id_legends`),
  ADD KEY `facturas_id_guias_foreign` (`id_guias`),
  ADD KEY `facturas_id_reldocs_foreign` (`id_relDocs`),
  ADD KEY `facturas_id_guiaembebida_foreign` (`id_guiaEmbebida`),
  ADD KEY `facturas_id_seller_foreign` (`id_seller`),
  ADD KEY `facturas_id_direccion_entrega_foreign` (`id_direccion_entrega`),
  ADD KEY `facturas_id_cargo_foreign` (`id_cargo`);

--
-- Indices de la tabla `factura_detalles`
--
ALTER TABLE `factura_detalles`
  ADD PRIMARY KEY (`id_det_fac`),
  ADD KEY `factura_detalles_id_factura_foreign` (`id_factura`),
  ADD KEY `factura_detalles_id_prod_foreign` (`id_prod`);

--
-- Indices de la tabla `failed_jobs`
--
ALTER TABLE `failed_jobs`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `gasto`
--
ALTER TABLE `gasto`
  ADD PRIMARY KEY (`id_gas`),
  ADD KEY `gasto_id_prov_foreign` (`id_prov`),
  ADD KEY `gasto_id_proy_foreign` (`id_proy`);

--
-- Indices de la tabla `guia_embebidas`
--
ALTER TABLE `guia_embebidas`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `guia_facturas`
--
ALTER TABLE `guia_facturas`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `guia_remision`
--
ALTER TABLE `guia_remision`
  ADD PRIMARY KEY (`id_guia_remision`),
  ADD KEY `guia_remision_id_emp_foreign` (`id_emp`),
  ADD KEY `guia_remision_id_cli_foreign` (`id_cli`),
  ADD KEY `guia_remision_id_envio_foreign` (`id_envio`),
  ADD KEY `guia_remision_solcli_id_foreign` (`solcli_id`);

--
-- Indices de la tabla `guia_remision_det`
--
ALTER TABLE `guia_remision_det`
  ADD PRIMARY KEY (`id_guia_remision_det`),
  ADD KEY `guia_remision_det_id_guia_remision_foreign` (`id_guia_remision`),
  ADD KEY `guia_remision_det_id_prod_foreign` (`id_prod`);

--
-- Indices de la tabla `kardex`
--
ALTER TABLE `kardex`
  ADD PRIMARY KEY (`id_kar`),
  ADD KEY `kardex_id_ord_det_foreign` (`id_ord_det`),
  ADD KEY `kardex_id_ord_com_foreign` (`id_ord_com`),
  ADD KEY `kardex_id_col_foreign` (`id_col`);

--
-- Indices de la tabla `leyenda_facturas`
--
ALTER TABLE `leyenda_facturas`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `marca`
--
ALTER TABLE `marca`
  ADD PRIMARY KEY (`id_mar`);

--
-- Indices de la tabla `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `modelo`
--
ALTER TABLE `modelo`
  ADD PRIMARY KEY (`id_mod`);

--
-- Indices de la tabla `orden_compra`
--
ALTER TABLE `orden_compra`
  ADD PRIMARY KEY (`id_ord_com`),
  ADD UNIQUE KEY `orden_compra_ord_com_cod_unique` (`ord_com_cod`),
  ADD KEY `orden_compra_cotprov_id_foreign` (`cotprov_id`),
  ADD KEY `orden_compra_id_emp_foreign` (`id_emp`),
  ADD KEY `orden_compra_id_col_foreign` (`id_col`),
  ADD KEY `orden_compra_id_pro_foreign` (`id_pro`),
  ADD KEY `orden_compra_id_cli_foreign` (`id_cli`);

--
-- Indices de la tabla `orden_compra_det`
--
ALTER TABLE `orden_compra_det`
  ADD PRIMARY KEY (`id_ord_det`),
  ADD KEY `orden_compra_det_id_ord_com_foreign` (`id_ord_com`),
  ADD KEY `orden_compra_det_id_prod_foreign` (`id_prod`);

--
-- Indices de la tabla `pagos`
--
ALTER TABLE `pagos`
  ADD PRIMARY KEY (`id_pagos`),
  ADD KEY `pagos_id_factura_foreign` (`id_factura`);

--
-- Indices de la tabla `producto`
--
ALTER TABLE `producto`
  ADD PRIMARY KEY (`id_prod`),
  ADD KEY `producto_id_unimed_foreign` (`id_unimed`),
  ADD KEY `producto_id_mar_foreign` (`id_mar`),
  ADD KEY `producto_id_mod_foreign` (`id_mod`),
  ADD KEY `producto_id_fab_foreign` (`id_fab`);

--
-- Indices de la tabla `proforma_cliente`
--
ALTER TABLE `proforma_cliente`
  ADD PRIMARY KEY (`id_pro`),
  ADD KEY `proforma_cliente_id_cli_foreign` (`id_cli`),
  ADD KEY `proforma_cliente_id_proy_foreign` (`id_proy`),
  ADD KEY `proforma_cliente_id_col_foreign` (`id_col`),
  ADD KEY `proforma_cliente_solcli_id_foreign` (`solcli_id`);

--
-- Indices de la tabla `proforma_cliente_det`
--
ALTER TABLE `proforma_cliente_det`
  ADD PRIMARY KEY (`id_prof_det`),
  ADD KEY `proforma_cliente_det_id_pro_foreign` (`id_pro`),
  ADD KEY `proforma_cliente_det_id_prod_foreign` (`id_prod`),
  ADD KEY `proforma_cliente_det_id_prov_foreign` (`id_prov`),
  ADD KEY `proforma_cliente_det_id_sec_foreign` (`id_sec`),
  ADD KEY `proforma_cliente_det_id_prov_dir_foreign` (`id_prov_dir`);

--
-- Indices de la tabla `proveedor`
--
ALTER TABLE `proveedor`
  ADD PRIMARY KEY (`id_prov`),
  ADD KEY `proveedor_id_tipdoc_foreign` (`id_tipdoc`);

--
-- Indices de la tabla `proveedor_banco`
--
ALTER TABLE `proveedor_banco`
  ADD PRIMARY KEY (`id_prov_ban`),
  ADD KEY `proveedor_banco_id_prov_foreign` (`id_prov`);

--
-- Indices de la tabla `proveedor_colaborador`
--
ALTER TABLE `proveedor_colaborador`
  ADD PRIMARY KEY (`id_prov_col`),
  ADD KEY `proveedor_colaborador_id_prov_foreign` (`id_prov`);

--
-- Indices de la tabla `proveedor_direccion`
--
ALTER TABLE `proveedor_direccion`
  ADD PRIMARY KEY (`id_prov_dir`),
  ADD KEY `proveedor_direccion_id_prov_foreign` (`id_prov`);

--
-- Indices de la tabla `proyecto`
--
ALTER TABLE `proyecto`
  ADD PRIMARY KEY (`id_proy`),
  ADD KEY `proyecto_id_cli_foreign` (`id_cli`);

--
-- Indices de la tabla `registro_cambio`
--
ALTER TABLE `registro_cambio`
  ADD PRIMARY KEY (`id_regcam`),
  ADD KEY `registro_cambio_id_tipcam_foreign` (`id_tipcam`),
  ADD KEY `registro_cambio_id_col_foreign` (`id_col`);

--
-- Indices de la tabla `seccion_pdfs`
--
ALTER TABLE `seccion_pdfs`
  ADD PRIMARY KEY (`id_sec`);

--
-- Indices de la tabla `sellers`
--
ALTER TABLE `sellers`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `solicitud_cotizacion_cliente`
--
ALTER TABLE `solicitud_cotizacion_cliente`
  ADD PRIMARY KEY (`solcli_id`),
  ADD UNIQUE KEY `solicitud_cotizacion_cliente_solcli_cod_unique` (`solcli_cod`),
  ADD KEY `solicitud_cotizacion_cliente_id_proy_foreign` (`id_proy`),
  ADD KEY `solicitud_cotizacion_cliente_id_cli_foreign` (`id_cli`),
  ADD KEY `solicitud_cotizacion_cliente_id_col_foreign` (`id_col`);

--
-- Indices de la tabla `solicitud_cotizacion_cliente_det`
--
ALTER TABLE `solicitud_cotizacion_cliente_det`
  ADD PRIMARY KEY (`solclidet_id`),
  ADD KEY `solicitud_cotizacion_cliente_det_solcli_id_foreign` (`solcli_id`),
  ADD KEY `solicitud_cotizacion_cliente_det_id_prod_foreign` (`id_prod`);

--
-- Indices de la tabla `tipo_cambio`
--
ALTER TABLE `tipo_cambio`
  ADD PRIMARY KEY (`id_tipcam`);

--
-- Indices de la tabla `tipo_documento`
--
ALTER TABLE `tipo_documento`
  ADD PRIMARY KEY (`id_tipdoc`);

--
-- Indices de la tabla `transportista`
--
ALTER TABLE `transportista`
  ADD PRIMARY KEY (`id_transportista`);

--
-- Indices de la tabla `unidad_medida`
--
ALTER TABLE `unidad_medida`
  ADD PRIMARY KEY (`id_unimed`);

--
-- Indices de la tabla `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id_col`),
  ADD UNIQUE KEY `users_email_unique` (`email`),
  ADD KEY `users_id_tipdoc_foreign` (`id_tipdoc`),
  ADD KEY `users_id_car_foreign` (`id_car`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `anticipos`
--
ALTER TABLE `anticipos`
  MODIFY `id_anticipos` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `cargo`
--
ALTER TABLE `cargo`
  MODIFY `id_car` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `cargos`
--
ALTER TABLE `cargos`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `cliente`
--
ALTER TABLE `cliente`
  MODIFY `id_cli` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT de la tabla `cliente_contacto`
--
ALTER TABLE `cliente_contacto`
  MODIFY `id_cli_con` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT de la tabla `cliente_direccion`
--
ALTER TABLE `cliente_direccion`
  MODIFY `id_cli_dir` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT de la tabla `cotizacion_proveedor`
--
ALTER TABLE `cotizacion_proveedor`
  MODIFY `cotprov_id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `cotizacion_proveedor_det`
--
ALTER TABLE `cotizacion_proveedor_det`
  MODIFY `cotprovdet_id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de la tabla `descuentos`
--
ALTER TABLE `descuentos`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `direccion_entregas`
--
ALTER TABLE `direccion_entregas`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `documento_relacionados`
--
ALTER TABLE `documento_relacionados`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `empresa`
--
ALTER TABLE `empresa`
  MODIFY `id_emp` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `envio`
--
ALTER TABLE `envio`
  MODIFY `id_envio` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `fabricante`
--
ALTER TABLE `fabricante`
  MODIFY `id_fab` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=34;

--
-- AUTO_INCREMENT de la tabla `facturas`
--
ALTER TABLE `facturas`
  MODIFY `id_factura` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `factura_detalles`
--
ALTER TABLE `factura_detalles`
  MODIFY `id_det_fac` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `failed_jobs`
--
ALTER TABLE `failed_jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `gasto`
--
ALTER TABLE `gasto`
  MODIFY `id_gas` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `guia_embebidas`
--
ALTER TABLE `guia_embebidas`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `guia_facturas`
--
ALTER TABLE `guia_facturas`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `guia_remision`
--
ALTER TABLE `guia_remision`
  MODIFY `id_guia_remision` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `guia_remision_det`
--
ALTER TABLE `guia_remision_det`
  MODIFY `id_guia_remision_det` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `kardex`
--
ALTER TABLE `kardex`
  MODIFY `id_kar` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `leyenda_facturas`
--
ALTER TABLE `leyenda_facturas`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `marca`
--
ALTER TABLE `marca`
  MODIFY `id_mar` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;

--
-- AUTO_INCREMENT de la tabla `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=49;

--
-- AUTO_INCREMENT de la tabla `modelo`
--
ALTER TABLE `modelo`
  MODIFY `id_mod` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=139;

--
-- AUTO_INCREMENT de la tabla `orden_compra`
--
ALTER TABLE `orden_compra`
  MODIFY `id_ord_com` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `orden_compra_det`
--
ALTER TABLE `orden_compra_det`
  MODIFY `id_ord_det` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `pagos`
--
ALTER TABLE `pagos`
  MODIFY `id_pagos` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `producto`
--
ALTER TABLE `producto`
  MODIFY `id_prod` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=109;

--
-- AUTO_INCREMENT de la tabla `proforma_cliente`
--
ALTER TABLE `proforma_cliente`
  MODIFY `id_pro` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT de la tabla `proforma_cliente_det`
--
ALTER TABLE `proforma_cliente_det`
  MODIFY `id_prof_det` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;

--
-- AUTO_INCREMENT de la tabla `proveedor`
--
ALTER TABLE `proveedor`
  MODIFY `id_prov` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `proveedor_banco`
--
ALTER TABLE `proveedor_banco`
  MODIFY `id_prov_ban` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `proveedor_colaborador`
--
ALTER TABLE `proveedor_colaborador`
  MODIFY `id_prov_col` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `proveedor_direccion`
--
ALTER TABLE `proveedor_direccion`
  MODIFY `id_prov_dir` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT de la tabla `proyecto`
--
ALTER TABLE `proyecto`
  MODIFY `id_proy` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT de la tabla `registro_cambio`
--
ALTER TABLE `registro_cambio`
  MODIFY `id_regcam` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=644;

--
-- AUTO_INCREMENT de la tabla `seccion_pdfs`
--
ALTER TABLE `seccion_pdfs`
  MODIFY `id_sec` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `sellers`
--
ALTER TABLE `sellers`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `solicitud_cotizacion_cliente`
--
ALTER TABLE `solicitud_cotizacion_cliente`
  MODIFY `solcli_id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de la tabla `solicitud_cotizacion_cliente_det`
--
ALTER TABLE `solicitud_cotizacion_cliente_det`
  MODIFY `solclidet_id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;

--
-- AUTO_INCREMENT de la tabla `tipo_cambio`
--
ALTER TABLE `tipo_cambio`
  MODIFY `id_tipcam` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `tipo_documento`
--
ALTER TABLE `tipo_documento`
  MODIFY `id_tipdoc` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `transportista`
--
ALTER TABLE `transportista`
  MODIFY `id_transportista` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `unidad_medida`
--
ALTER TABLE `unidad_medida`
  MODIFY `id_unimed` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT de la tabla `users`
--
ALTER TABLE `users`
  MODIFY `id_col` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `anticipos`
--
ALTER TABLE `anticipos`
  ADD CONSTRAINT `anticipos_id_factura_foreign` FOREIGN KEY (`id_factura`) REFERENCES `facturas` (`id_factura`);

--
-- Filtros para la tabla `cliente`
--
ALTER TABLE `cliente`
  ADD CONSTRAINT `cliente_id_tipdoc_foreign` FOREIGN KEY (`id_tipdoc`) REFERENCES `tipo_documento` (`id_tipdoc`);

--
-- Filtros para la tabla `cliente_contacto`
--
ALTER TABLE `cliente_contacto`
  ADD CONSTRAINT `cliente_contacto_id_cli_foreign` FOREIGN KEY (`id_cli`) REFERENCES `cliente` (`id_cli`);

--
-- Filtros para la tabla `cliente_direccion`
--
ALTER TABLE `cliente_direccion`
  ADD CONSTRAINT `cliente_direccion_id_cli_foreign` FOREIGN KEY (`id_cli`) REFERENCES `cliente` (`id_cli`);

--
-- Filtros para la tabla `cotizacion_proveedor`
--
ALTER TABLE `cotizacion_proveedor`
  ADD CONSTRAINT `cotizacion_proveedor_id_cli_foreign` FOREIGN KEY (`id_cli`) REFERENCES `cliente` (`id_cli`),
  ADD CONSTRAINT `cotizacion_proveedor_id_col_foreign` FOREIGN KEY (`id_col`) REFERENCES `users` (`id_col`),
  ADD CONSTRAINT `cotizacion_proveedor_id_prov_foreign` FOREIGN KEY (`id_prov`) REFERENCES `proveedor` (`id_prov`),
  ADD CONSTRAINT `cotizacion_proveedor_id_proy_foreign` FOREIGN KEY (`id_proy`) REFERENCES `proyecto` (`id_proy`),
  ADD CONSTRAINT `cotizacion_proveedor_solcli_id_foreign` FOREIGN KEY (`solcli_id`) REFERENCES `solicitud_cotizacion_cliente` (`solcli_id`);

--
-- Filtros para la tabla `cotizacion_proveedor_det`
--
ALTER TABLE `cotizacion_proveedor_det`
  ADD CONSTRAINT `cotizacion_proveedor_det_cotprov_id_foreign` FOREIGN KEY (`cotprov_id`) REFERENCES `cotizacion_proveedor` (`cotprov_id`),
  ADD CONSTRAINT `cotizacion_proveedor_det_id_prod_foreign` FOREIGN KEY (`id_prod`) REFERENCES `producto` (`id_prod`);

--
-- Filtros para la tabla `empresa`
--
ALTER TABLE `empresa`
  ADD CONSTRAINT `empresa_id_tipdoc_foreign` FOREIGN KEY (`id_tipdoc`) REFERENCES `tipo_documento` (`id_tipdoc`);

--
-- Filtros para la tabla `envio`
--
ALTER TABLE `envio`
  ADD CONSTRAINT `envio_id_transportista_foreign` FOREIGN KEY (`id_transportista`) REFERENCES `transportista` (`id_transportista`);

--
-- Filtros para la tabla `facturas`
--
ALTER TABLE `facturas`
  ADD CONSTRAINT `facturas_id_cargo_foreign` FOREIGN KEY (`id_cargo`) REFERENCES `cargos` (`id`),
  ADD CONSTRAINT `facturas_id_cli_foreign` FOREIGN KEY (`id_cli`) REFERENCES `cliente` (`id_cli`),
  ADD CONSTRAINT `facturas_id_direccion_entrega_foreign` FOREIGN KEY (`id_direccion_entrega`) REFERENCES `direccion_entregas` (`id`),
  ADD CONSTRAINT `facturas_id_emp_foreign` FOREIGN KEY (`id_emp`) REFERENCES `empresa` (`id_emp`),
  ADD CONSTRAINT `facturas_id_guiaembebida_foreign` FOREIGN KEY (`id_guiaEmbebida`) REFERENCES `guia_embebidas` (`id`),
  ADD CONSTRAINT `facturas_id_guias_foreign` FOREIGN KEY (`id_guias`) REFERENCES `guia_facturas` (`id`),
  ADD CONSTRAINT `facturas_id_legends_foreign` FOREIGN KEY (`id_legends`) REFERENCES `leyenda_facturas` (`id`),
  ADD CONSTRAINT `facturas_id_reldocs_foreign` FOREIGN KEY (`id_relDocs`) REFERENCES `documento_relacionados` (`id`),
  ADD CONSTRAINT `facturas_id_seller_foreign` FOREIGN KEY (`id_seller`) REFERENCES `sellers` (`id`),
  ADD CONSTRAINT `facturas_solcli_id_foreign` FOREIGN KEY (`solcli_id`) REFERENCES `solicitud_cotizacion_cliente` (`solcli_id`);

--
-- Filtros para la tabla `factura_detalles`
--
ALTER TABLE `factura_detalles`
  ADD CONSTRAINT `factura_detalles_id_factura_foreign` FOREIGN KEY (`id_factura`) REFERENCES `facturas` (`id_factura`),
  ADD CONSTRAINT `factura_detalles_id_prod_foreign` FOREIGN KEY (`id_prod`) REFERENCES `producto` (`id_prod`);

--
-- Filtros para la tabla `gasto`
--
ALTER TABLE `gasto`
  ADD CONSTRAINT `gasto_id_prov_foreign` FOREIGN KEY (`id_prov`) REFERENCES `proveedor` (`id_prov`),
  ADD CONSTRAINT `gasto_id_proy_foreign` FOREIGN KEY (`id_proy`) REFERENCES `proyecto` (`id_proy`);

--
-- Filtros para la tabla `guia_remision`
--
ALTER TABLE `guia_remision`
  ADD CONSTRAINT `guia_remision_id_cli_foreign` FOREIGN KEY (`id_cli`) REFERENCES `cliente` (`id_cli`),
  ADD CONSTRAINT `guia_remision_id_emp_foreign` FOREIGN KEY (`id_emp`) REFERENCES `empresa` (`id_emp`),
  ADD CONSTRAINT `guia_remision_id_envio_foreign` FOREIGN KEY (`id_envio`) REFERENCES `envio` (`id_envio`),
  ADD CONSTRAINT `guia_remision_solcli_id_foreign` FOREIGN KEY (`solcli_id`) REFERENCES `solicitud_cotizacion_cliente` (`solcli_id`);

--
-- Filtros para la tabla `guia_remision_det`
--
ALTER TABLE `guia_remision_det`
  ADD CONSTRAINT `guia_remision_det_id_guia_remision_foreign` FOREIGN KEY (`id_guia_remision`) REFERENCES `guia_remision` (`id_guia_remision`),
  ADD CONSTRAINT `guia_remision_det_id_prod_foreign` FOREIGN KEY (`id_prod`) REFERENCES `producto` (`id_prod`);

--
-- Filtros para la tabla `kardex`
--
ALTER TABLE `kardex`
  ADD CONSTRAINT `kardex_id_col_foreign` FOREIGN KEY (`id_col`) REFERENCES `users` (`id_col`),
  ADD CONSTRAINT `kardex_id_ord_com_foreign` FOREIGN KEY (`id_ord_com`) REFERENCES `orden_compra` (`id_ord_com`),
  ADD CONSTRAINT `kardex_id_ord_det_foreign` FOREIGN KEY (`id_ord_det`) REFERENCES `orden_compra_det` (`id_ord_det`);

--
-- Filtros para la tabla `orden_compra`
--
ALTER TABLE `orden_compra`
  ADD CONSTRAINT `orden_compra_cotprov_id_foreign` FOREIGN KEY (`cotprov_id`) REFERENCES `cotizacion_proveedor` (`cotprov_id`),
  ADD CONSTRAINT `orden_compra_id_cli_foreign` FOREIGN KEY (`id_cli`) REFERENCES `cliente` (`id_cli`),
  ADD CONSTRAINT `orden_compra_id_col_foreign` FOREIGN KEY (`id_col`) REFERENCES `users` (`id_col`),
  ADD CONSTRAINT `orden_compra_id_emp_foreign` FOREIGN KEY (`id_emp`) REFERENCES `empresa` (`id_emp`),
  ADD CONSTRAINT `orden_compra_id_pro_foreign` FOREIGN KEY (`id_pro`) REFERENCES `proforma_cliente` (`id_pro`);

--
-- Filtros para la tabla `orden_compra_det`
--
ALTER TABLE `orden_compra_det`
  ADD CONSTRAINT `orden_compra_det_id_ord_com_foreign` FOREIGN KEY (`id_ord_com`) REFERENCES `orden_compra` (`id_ord_com`),
  ADD CONSTRAINT `orden_compra_det_id_prod_foreign` FOREIGN KEY (`id_prod`) REFERENCES `producto` (`id_prod`);

--
-- Filtros para la tabla `pagos`
--
ALTER TABLE `pagos`
  ADD CONSTRAINT `pagos_id_factura_foreign` FOREIGN KEY (`id_factura`) REFERENCES `facturas` (`id_factura`);

--
-- Filtros para la tabla `producto`
--
ALTER TABLE `producto`
  ADD CONSTRAINT `producto_id_fab_foreign` FOREIGN KEY (`id_fab`) REFERENCES `fabricante` (`id_fab`),
  ADD CONSTRAINT `producto_id_mar_foreign` FOREIGN KEY (`id_mar`) REFERENCES `marca` (`id_mar`),
  ADD CONSTRAINT `producto_id_mod_foreign` FOREIGN KEY (`id_mod`) REFERENCES `modelo` (`id_mod`),
  ADD CONSTRAINT `producto_id_unimed_foreign` FOREIGN KEY (`id_unimed`) REFERENCES `unidad_medida` (`id_unimed`);

--
-- Filtros para la tabla `proforma_cliente`
--
ALTER TABLE `proforma_cliente`
  ADD CONSTRAINT `proforma_cliente_id_cli_foreign` FOREIGN KEY (`id_cli`) REFERENCES `cliente` (`id_cli`),
  ADD CONSTRAINT `proforma_cliente_id_col_foreign` FOREIGN KEY (`id_col`) REFERENCES `users` (`id_col`),
  ADD CONSTRAINT `proforma_cliente_id_proy_foreign` FOREIGN KEY (`id_proy`) REFERENCES `proyecto` (`id_proy`),
  ADD CONSTRAINT `proforma_cliente_solcli_id_foreign` FOREIGN KEY (`solcli_id`) REFERENCES `solicitud_cotizacion_cliente` (`solcli_id`);

--
-- Filtros para la tabla `proforma_cliente_det`
--
ALTER TABLE `proforma_cliente_det`
  ADD CONSTRAINT `proforma_cliente_det_id_pro_foreign` FOREIGN KEY (`id_pro`) REFERENCES `proforma_cliente` (`id_pro`),
  ADD CONSTRAINT `proforma_cliente_det_id_prod_foreign` FOREIGN KEY (`id_prod`) REFERENCES `producto` (`id_prod`),
  ADD CONSTRAINT `proforma_cliente_det_id_prov_dir_foreign` FOREIGN KEY (`id_prov_dir`) REFERENCES `proveedor_direccion` (`id_prov_dir`),
  ADD CONSTRAINT `proforma_cliente_det_id_prov_foreign` FOREIGN KEY (`id_prov`) REFERENCES `proveedor` (`id_prov`),
  ADD CONSTRAINT `proforma_cliente_det_id_sec_foreign` FOREIGN KEY (`id_sec`) REFERENCES `seccion_pdfs` (`id_sec`);

--
-- Filtros para la tabla `proveedor`
--
ALTER TABLE `proveedor`
  ADD CONSTRAINT `proveedor_id_tipdoc_foreign` FOREIGN KEY (`id_tipdoc`) REFERENCES `tipo_documento` (`id_tipdoc`);

--
-- Filtros para la tabla `proveedor_banco`
--
ALTER TABLE `proveedor_banco`
  ADD CONSTRAINT `proveedor_banco_id_prov_foreign` FOREIGN KEY (`id_prov`) REFERENCES `proveedor` (`id_prov`);

--
-- Filtros para la tabla `proveedor_colaborador`
--
ALTER TABLE `proveedor_colaborador`
  ADD CONSTRAINT `proveedor_colaborador_id_prov_foreign` FOREIGN KEY (`id_prov`) REFERENCES `proveedor` (`id_prov`);

--
-- Filtros para la tabla `proveedor_direccion`
--
ALTER TABLE `proveedor_direccion`
  ADD CONSTRAINT `proveedor_direccion_id_prov_foreign` FOREIGN KEY (`id_prov`) REFERENCES `proveedor` (`id_prov`);

--
-- Filtros para la tabla `proyecto`
--
ALTER TABLE `proyecto`
  ADD CONSTRAINT `proyecto_id_cli_foreign` FOREIGN KEY (`id_cli`) REFERENCES `cliente` (`id_cli`);

--
-- Filtros para la tabla `registro_cambio`
--
ALTER TABLE `registro_cambio`
  ADD CONSTRAINT `registro_cambio_id_col_foreign` FOREIGN KEY (`id_col`) REFERENCES `users` (`id_col`),
  ADD CONSTRAINT `registro_cambio_id_tipcam_foreign` FOREIGN KEY (`id_tipcam`) REFERENCES `tipo_cambio` (`id_tipcam`);

--
-- Filtros para la tabla `solicitud_cotizacion_cliente`
--
ALTER TABLE `solicitud_cotizacion_cliente`
  ADD CONSTRAINT `solicitud_cotizacion_cliente_id_cli_foreign` FOREIGN KEY (`id_cli`) REFERENCES `cliente` (`id_cli`),
  ADD CONSTRAINT `solicitud_cotizacion_cliente_id_col_foreign` FOREIGN KEY (`id_col`) REFERENCES `users` (`id_col`),
  ADD CONSTRAINT `solicitud_cotizacion_cliente_id_proy_foreign` FOREIGN KEY (`id_proy`) REFERENCES `proyecto` (`id_proy`);

--
-- Filtros para la tabla `solicitud_cotizacion_cliente_det`
--
ALTER TABLE `solicitud_cotizacion_cliente_det`
  ADD CONSTRAINT `solicitud_cotizacion_cliente_det_id_prod_foreign` FOREIGN KEY (`id_prod`) REFERENCES `producto` (`id_prod`),
  ADD CONSTRAINT `solicitud_cotizacion_cliente_det_solcli_id_foreign` FOREIGN KEY (`solcli_id`) REFERENCES `solicitud_cotizacion_cliente` (`solcli_id`);

--
-- Filtros para la tabla `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `users_id_car_foreign` FOREIGN KEY (`id_car`) REFERENCES `cargo` (`id_car`),
  ADD CONSTRAINT `users_id_tipdoc_foreign` FOREIGN KEY (`id_tipdoc`) REFERENCES `tipo_documento` (`id_tipdoc`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
