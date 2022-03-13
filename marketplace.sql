--
-- PostgreSQL database dump
--

-- Dumped from database version 14.2
-- Dumped by pg_dump version 14.1

-- Started on 2022-03-13 12:53:57

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 212 (class 1259 OID 32775)
-- Name: coaches; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.coaches (
    address text NOT NULL,
    name text NOT NULL
);


ALTER TABLE public.coaches OWNER TO postgres;

--
-- TOC entry 210 (class 1259 OID 24576)
-- Name: service_requests; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.service_requests (
    address text NOT NULL,
    service_name text NOT NULL,
    service_description text NOT NULL
);


ALTER TABLE public.service_requests OWNER TO postgres;

--
-- TOC entry 211 (class 1259 OID 32768)
-- Name: services; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.services (
    address text NOT NULL,
    service_name text NOT NULL,
    service_description text
);


ALTER TABLE public.services OWNER TO postgres;

--
-- TOC entry 209 (class 1259 OID 16402)
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    name text,
    address text NOT NULL
);


ALTER TABLE public.users OWNER TO postgres;

--
-- TOC entry 3182 (class 2606 OID 32781)
-- Name: coaches coaches_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.coaches
    ADD CONSTRAINT coaches_pkey PRIMARY KEY (address);


--
-- TOC entry 3178 (class 2606 OID 24582)
-- Name: service_requests service_requests_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.service_requests
    ADD CONSTRAINT service_requests_pkey PRIMARY KEY (address);


--
-- TOC entry 3180 (class 2606 OID 32774)
-- Name: services services_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.services
    ADD CONSTRAINT services_pkey PRIMARY KEY (address);


--
-- TOC entry 3176 (class 2606 OID 16408)
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (address);


-- Completed on 2022-03-13 12:53:57

--
-- PostgreSQL database dump complete
--

