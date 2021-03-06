USE [master]
GO
/****** Object:  Database [DAI-Personaje]    Script Date: 24/5/2022 15:03:20 ******/
CREATE DATABASE [DAI-Personaje]
 CONTAINMENT = NONE
 ON  PRIMARY 
( NAME = N'DAI-Personaje', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL14.MSSQLSERVER\MSSQL\DATA\DAI-Personaje.mdf' , SIZE = 8192KB , MAXSIZE = UNLIMITED, FILEGROWTH = 65536KB )
 LOG ON 
( NAME = N'DAI-Personaje_log', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL14.MSSQLSERVER\MSSQL\DATA\DAI-Personaje_log.ldf' , SIZE = 8192KB , MAXSIZE = 2048GB , FILEGROWTH = 65536KB )
GO
ALTER DATABASE [DAI-Personaje] SET COMPATIBILITY_LEVEL = 140
GO
IF (1 = FULLTEXTSERVICEPROPERTY('IsFullTextInstalled'))
begin
EXEC [DAI-Personaje].[dbo].[sp_fulltext_database] @action = 'enable'
end
GO
ALTER DATABASE [DAI-Personaje] SET ANSI_NULL_DEFAULT OFF 
GO
ALTER DATABASE [DAI-Personaje] SET ANSI_NULLS OFF 
GO
ALTER DATABASE [DAI-Personaje] SET ANSI_PADDING OFF 
GO
ALTER DATABASE [DAI-Personaje] SET ANSI_WARNINGS OFF 
GO
ALTER DATABASE [DAI-Personaje] SET ARITHABORT OFF 
GO
ALTER DATABASE [DAI-Personaje] SET AUTO_CLOSE OFF 
GO
ALTER DATABASE [DAI-Personaje] SET AUTO_SHRINK OFF 
GO
ALTER DATABASE [DAI-Personaje] SET AUTO_UPDATE_STATISTICS ON 
GO
ALTER DATABASE [DAI-Personaje] SET CURSOR_CLOSE_ON_COMMIT OFF 
GO
ALTER DATABASE [DAI-Personaje] SET CURSOR_DEFAULT  GLOBAL 
GO
ALTER DATABASE [DAI-Personaje] SET CONCAT_NULL_YIELDS_NULL OFF 
GO
ALTER DATABASE [DAI-Personaje] SET NUMERIC_ROUNDABORT OFF 
GO
ALTER DATABASE [DAI-Personaje] SET QUOTED_IDENTIFIER OFF 
GO
ALTER DATABASE [DAI-Personaje] SET RECURSIVE_TRIGGERS OFF 
GO
ALTER DATABASE [DAI-Personaje] SET  DISABLE_BROKER 
GO
ALTER DATABASE [DAI-Personaje] SET AUTO_UPDATE_STATISTICS_ASYNC OFF 
GO
ALTER DATABASE [DAI-Personaje] SET DATE_CORRELATION_OPTIMIZATION OFF 
GO
ALTER DATABASE [DAI-Personaje] SET TRUSTWORTHY OFF 
GO
ALTER DATABASE [DAI-Personaje] SET ALLOW_SNAPSHOT_ISOLATION OFF 
GO
ALTER DATABASE [DAI-Personaje] SET PARAMETERIZATION SIMPLE 
GO
ALTER DATABASE [DAI-Personaje] SET READ_COMMITTED_SNAPSHOT OFF 
GO
ALTER DATABASE [DAI-Personaje] SET HONOR_BROKER_PRIORITY OFF 
GO
ALTER DATABASE [DAI-Personaje] SET RECOVERY FULL 
GO
ALTER DATABASE [DAI-Personaje] SET  MULTI_USER 
GO
ALTER DATABASE [DAI-Personaje] SET PAGE_VERIFY CHECKSUM  
GO
ALTER DATABASE [DAI-Personaje] SET DB_CHAINING OFF 
GO
ALTER DATABASE [DAI-Personaje] SET FILESTREAM( NON_TRANSACTED_ACCESS = OFF ) 
GO
ALTER DATABASE [DAI-Personaje] SET TARGET_RECOVERY_TIME = 60 SECONDS 
GO
ALTER DATABASE [DAI-Personaje] SET DELAYED_DURABILITY = DISABLED 
GO
EXEC sys.sp_db_vardecimal_storage_format N'DAI-Personaje', N'ON'
GO
ALTER DATABASE [DAI-Personaje] SET QUERY_STORE = OFF
GO
USE [DAI-Personaje]
GO
/****** Object:  User [Personaje]    Script Date: 24/5/2022 15:03:20 ******/
CREATE USER [Personaje] FOR LOGIN [Personaje] WITH DEFAULT_SCHEMA=[dbo]
GO
/****** Object:  User [alumno]    Script Date: 24/5/2022 15:03:20 ******/
CREATE USER [alumno] FOR LOGIN [alumno] WITH DEFAULT_SCHEMA=[dbo]
GO
ALTER ROLE [db_owner] ADD MEMBER [Personaje]
GO
/****** Object:  Table [dbo].[Peliculas]    Script Date: 24/5/2022 15:03:20 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Peliculas](
	[ImagenPelicula] [varchar](50) NOT NULL,
	[idPelicula] [int] IDENTITY(1,1) NOT NULL,
	[Titulo] [varchar](50) NOT NULL,
	[FechaCreacion] [varchar](50) NOT NULL,
	[Calificacion] [int] NOT NULL,
 CONSTRAINT [PK_Peliculas] PRIMARY KEY CLUSTERED 
(
	[idPelicula] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Personajes]    Script Date: 24/5/2022 15:03:20 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Personajes](
	[Imagen] [varchar](255) NOT NULL,
	[Nombre] [varchar](50) NOT NULL,
	[Edad] [int] NOT NULL,
	[Peso] [int] NOT NULL,
	[Historia] [varchar](5000) NOT NULL,
	[idPersonaje] [int] IDENTITY(1,1) NOT NULL,
	[Apellido] [varchar](50) NOT NULL,
 CONSTRAINT [PK_Personaje] PRIMARY KEY CLUSTERED 
(
	[idPersonaje] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[PersonajeXPelicula]    Script Date: 24/5/2022 15:03:20 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[PersonajeXPelicula](
	[idPersonaje] [int] NOT NULL,
	[idPelicula] [int] NOT NULL,
 CONSTRAINT [PK_PersonajeXPelicula] PRIMARY KEY CLUSTERED 
(
	[idPersonaje] ASC,
	[idPelicula] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
SET IDENTITY_INSERT [dbo].[Peliculas] ON 

INSERT [dbo].[Peliculas] ([ImagenPelicula], [idPelicula], [Titulo], [FechaCreacion], [Calificacion]) VALUES (N'foto', 2, N'Bee Movie', N'2010', 5)
INSERT [dbo].[Peliculas] ([ImagenPelicula], [idPelicula], [Titulo], [FechaCreacion], [Calificacion]) VALUES (N'foto', 3, N'Shrek', N'2006', 4)
INSERT [dbo].[Peliculas] ([ImagenPelicula], [idPelicula], [Titulo], [FechaCreacion], [Calificacion]) VALUES (N'foto', 4, N'Monsters Inc', N'2005', 3)
INSERT [dbo].[Peliculas] ([ImagenPelicula], [idPelicula], [Titulo], [FechaCreacion], [Calificacion]) VALUES (N'foto', 5, N'Shutter', N'2010', 5)
INSERT [dbo].[Peliculas] ([ImagenPelicula], [idPelicula], [Titulo], [FechaCreacion], [Calificacion]) VALUES (N'foto', 6, N'Up', N'2013', 2)
SET IDENTITY_INSERT [dbo].[Peliculas] OFF
GO
SET IDENTITY_INSERT [dbo].[Personajes] ON 

INSERT [dbo].[Personajes] ([Imagen], [Nombre], [Edad], [Peso], [Historia], [idPersonaje], [Apellido]) VALUES (N'url', N'Alan', 17, 80, N'hola', 3, N'Garber')
INSERT [dbo].[Personajes] ([Imagen], [Nombre], [Edad], [Peso], [Historia], [idPersonaje], [Apellido]) VALUES (N'url', N'Tomi', 17, 50, N'Chau', 4, N'Blaser')
SET IDENTITY_INSERT [dbo].[Personajes] OFF
GO
INSERT [dbo].[PersonajeXPelicula] ([idPersonaje], [idPelicula]) VALUES (3, 2)
INSERT [dbo].[PersonajeXPelicula] ([idPersonaje], [idPelicula]) VALUES (3, 3)
INSERT [dbo].[PersonajeXPelicula] ([idPersonaje], [idPelicula]) VALUES (3, 5)
INSERT [dbo].[PersonajeXPelicula] ([idPersonaje], [idPelicula]) VALUES (4, 2)
INSERT [dbo].[PersonajeXPelicula] ([idPersonaje], [idPelicula]) VALUES (4, 5)
INSERT [dbo].[PersonajeXPelicula] ([idPersonaje], [idPelicula]) VALUES (4, 6)
GO
USE [master]
GO
ALTER DATABASE [DAI-Personaje] SET  READ_WRITE 
GO
