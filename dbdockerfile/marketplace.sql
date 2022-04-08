PGDMP     ;                    z           marketplace    14.2    14.1                 0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false                       0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false                       0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false                       1262    16394    marketplace    DATABASE     o   CREATE DATABASE marketplace WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE = 'English_United States.1252';
    DROP DATABASE marketplace;
                postgres    false            �            1259    32786    bought_services    TABLE     �   CREATE TABLE public.bought_services (
    address text NOT NULL,
    servicename text NOT NULL,
    starts timestamp without time zone,
    ends timestamp without time zone
);
 #   DROP TABLE public.bought_services;
       public         heap    postgres    false            �            1259    32775    coaches    TABLE     S   CREATE TABLE public.coaches (
    address text NOT NULL,
    name text NOT NULL
);
    DROP TABLE public.coaches;
       public         heap    postgres    false            �            1259    24576    service_requests    TABLE     �   CREATE TABLE public.service_requests (
    address text NOT NULL,
    service_name text NOT NULL,
    service_description text NOT NULL,
    price numeric NOT NULL
);
 $   DROP TABLE public.service_requests;
       public         heap    postgres    false            �            1259    32768    services    TABLE     �   CREATE TABLE public.services (
    address text NOT NULL,
    service_name text NOT NULL,
    service_description text,
    price numeric
);
    DROP TABLE public.services;
       public         heap    postgres    false            �            1259    16402    users    TABLE     H   CREATE TABLE public.users (
    name text,
    address text NOT NULL
);
    DROP TABLE public.users;
       public         heap    postgres    false            r           2606    32781    coaches coaches_pkey 
   CONSTRAINT     W   ALTER TABLE ONLY public.coaches
    ADD CONSTRAINT coaches_pkey PRIMARY KEY (address);
 >   ALTER TABLE ONLY public.coaches DROP CONSTRAINT coaches_pkey;
       public            postgres    false    212            n           2606    32785 &   service_requests service_requests_pkey 
   CONSTRAINT     n   ALTER TABLE ONLY public.service_requests
    ADD CONSTRAINT service_requests_pkey PRIMARY KEY (service_name);
 P   ALTER TABLE ONLY public.service_requests DROP CONSTRAINT service_requests_pkey;
       public            postgres    false    210            p           2606    32783    services services_pkey 
   CONSTRAINT     ^   ALTER TABLE ONLY public.services
    ADD CONSTRAINT services_pkey PRIMARY KEY (service_name);
 @   ALTER TABLE ONLY public.services DROP CONSTRAINT services_pkey;
       public            postgres    false    211            l           2606    16408    users users_pkey 
   CONSTRAINT     S   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (address);
 :   ALTER TABLE ONLY public.users DROP CONSTRAINT users_pkey;
       public            postgres    false    209           