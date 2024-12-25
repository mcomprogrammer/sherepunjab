create database bank_management;
use bank_management;
create table Customer (c_id bigint primary key, 
first_name varchar(30),
 middle_name varchar(30),
 last_name varchar(30),
 dob date, 
 contact bigint, 
 email varchar(30), 
 pan_no varchar(30),
 age int, 
 address_area varchar(50),
 address_city varchar(30),
 address_pincode int);
 
 create table customer_data (c_id bigint, 
first_name varchar(30),
 middle_name varchar(30),
 last_name varchar(30),
 dob date, 
 contact bigint, 
 email varchar(30), 
 pan_no varchar(30),
 age int, 
 address_area varchar(50),
 address_city varchar(30),
 address_pincode int,
 log_date varchar(100));
 
-- CREATE DEFINER=`root`@`localhost` TRIGGER `before_insert_customer` BEFORE INSERT ON `customer` FOR EACH ROW BEGIN
--     SET NEW.age = FLOOR(DATEDIFF(CURDATE(), NEW.dob)/365);
-- END 


-- CREATE DEFINER=`root`@`localhost` TRIGGER `customer_AFTER_INSERT` AFTER INSERT ON `customer` FOR EACH ROW BEGIN
-- insert into customer_data values (new.c_id, 
-- new.first_name ,
--  new.middle_name ,
--  new.last_name ,
--  new.dob , 
--  new.contact , 
-- new.email , 
--  new.pan_no,
--  new.age , 
--  new.address_area ,
--  new.address_city ,
--  new.address_pincode,
--  concat('A Record has been inserted in Customer table at',
-- Date_Format(now(),'%d-%m-%y at %h:%i:%s %p')));
-- END


-- CREATE DEFINER=`root`@`localhost` TRIGGER `before_update_customer` BEFORE UPDATE ON `customer` FOR EACH ROW BEGIN
--     SET NEW.age = FLOOR(DATEDIFF(CURDATE(), NEW.dob)/365);
-- END


-- CREATE DEFINER=`root`@`localhost` TRIGGER `customer_AFTER_DELETE` AFTER DELETE ON `customer` FOR EACH ROW BEGIN
-- insert into customer_data values (old.c_id, 
-- old.first_name ,
--  old.middle_name ,
--  old.last_name ,
--  old.dob , 
--  old.contact , 
-- old.email , 
--  old.pan_no,
--  old.age , 
--  old.address_area ,
--  old.address_city ,
--  old.address_pincode,
--  concat('A Record has been deleted from Customer table at',
-- Date_Format(now(),'%d-%m-%y at %h:%i:%s %p')));
-- END