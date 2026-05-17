-- Create the main database for the Smart Campus WiFi project.
CREATE DATABASE SmartCampusWiFi;
-- Use this database before creating tables and inserting data.
USE SmartCampusWiFi;

--1.
-- This table stores the available WiFi networks inside the campus.
CREATE TABLE WiFiNetwork (
    Network_Id INT PRIMARY KEY,
    SSID VARCHAR(50) NOT NULL UNIQUE,
    VLAN_Id INT NOT NULL UNIQUE,
    Subnet_CIDR VARCHAR(30) NOT NULL,
    Security_Type VARCHAR(30) NOT NULL
);

--2.
-- This table stores user roles and the usage limit for each role.
CREATE TABLE Role (
    Role_Id INT PRIMARY KEY,
    Role_Name VARCHAR(30) NOT NULL UNIQUE,
    Max_Daily_Data_MB INT NOT NULL,
    Max_Devices INT NOT NULL
);

--3.
-- This table stores the main user information for students, staff, admins, and guests.
CREATE TABLE [User] (
    User_Id INT PRIMARY KEY,
    University_Id VARCHAR(20) NOT NULL UNIQUE,
    Full_Name VARCHAR(100) NOT NULL,
    Email VARCHAR(100) NOT NULL UNIQUE,
    Status VARCHAR(20) DEFAULT 'Active',
    Role_Id INT
);

--4.
-- This table stores the devices registered by users with trusted MAC addresses.
CREATE TABLE Device (
    Device_Id INT PRIMARY KEY,
    Device_Name VARCHAR(80) NOT NULL,
    MAC_Address VARCHAR(17) NOT NULL UNIQUE,
    Device_Type VARCHAR(20) NOT NULL,
    Is_Trusted BIT DEFAULT 1,
    User_Id INT
);

--5.
-- This table stores access points and the WiFi network connected to each one.
CREATE TABLE AccessPoint (
    AccessPoint_Id INT PRIMARY KEY,
    AP_Name VARCHAR(50) NOT NULL UNIQUE,
    IP_Address VARCHAR(20) NOT NULL UNIQUE,
    Location VARCHAR(100) NOT NULL,
    Status VARCHAR(20) DEFAULT 'Online',
    Network_Id INT
);

--6.
-- This table stores login sessions between a user, a device, and an access point.
CREATE TABLE Session_Log (
    Session_Id INT PRIMARY KEY,
    Login_Time DATETIME DEFAULT GETDATE(),
    Logout_Time DATETIME,
    Auth_Status VARCHAR(20) NOT NULL,
    User_Id INT,
    Device_Id INT,
    AccessPoint_Id INT
);

--7.
-- This table stores bandwidth usage details for every session.
CREATE TABLE Usage_Log (
    Log_Id INT PRIMARY KEY,
    Download_MB DECIMAL(10,2),
    Upload_MB DECIMAL(10,2),
    Log_Time DATETIME DEFAULT GETDATE(),
    Session_Id INT
);

--8.
-- This table stores recommendations to guide each role to the best network.
CREATE TABLE Recommendation (
    Recommendation_Id INT PRIMARY KEY,
    Recommended_Action VARCHAR(120) NOT NULL,
    Reason_Text VARCHAR(200) NOT NULL,
    Role_Id INT,
    Network_Id INT
);

--9.
-- This table stores admin actions and important system notes for users.
CREATE TABLE Admin_Action (
    Action_Id INT PRIMARY KEY,
    Action_Type VARCHAR(50) NOT NULL,
    Action_Time DATETIME DEFAULT GETDATE(),
    Notes VARCHAR(200),
    User_Id INT
);

------------------------------------------------------------
-- Insert sample WiFi networks used inside the campus.
INSERT INTO WiFiNetwork
VALUES
(1,'FCI-Students',10,'10.10.10.0/24','WPA2-Enterprise'),
(2,'FCI-Staff',20,'10.10.20.0/24','WPA2-Enterprise'),
(3,'FCI-Guest',30,'10.10.30.0/24','Captive Portal');

-- Insert the available user roles in the system.
INSERT INTO Role
VALUES
(1,'Student',2048,2),
(2,'Staff',4096,3),
(3,'Admin',8192,5),
(4,'Guest',512,1);

-- Insert sample campus users.
INSERT INTO [User]
VALUES
(1,'24030146','Noureldin Amr Mohamed','24030146@fci.edu.eg','Active',1),
(2,'24030026','Rahma Mohsen Abdelrahman','24030026@fci.edu.eg','Active',1),
(3,'24030171','Ahmed Mahmoud Khalaf','24030171@fci.edu.eg','Active',1),
(4,'STAFF1001','Mona Hassan','mona.hassan@fci.edu.eg','Active',2),
(5,'GUEST9001','Temporary Guest','guest9001@fci.edu.eg','Suspended',4);

-- Insert sample devices linked to users.
INSERT INTO Device
VALUES
(1,'Noureldin Laptop','A4:5E:60:12:9B:10','Laptop',1,1),
(2,'Noureldin Phone','88:2A:5E:77:11:23','Mobile',1,1),
(3,'Rahma Phone','0C:8B:FD:AA:09:44','Mobile',1,2),
(4,'Ahmed Laptop','90:E2:BA:30:CD:61','Laptop',1,3),
(5,'Staff Tablet','D0:37:45:81:21:19','Tablet',1,4),
(6,'Guest Phone','14:7D:DA:99:44:18','Mobile',0,5);

-- Insert sample access points in different campus locations.
INSERT INTO AccessPoint
VALUES
(1,'AP-Library-01','10.10.10.11','Main Library - First Floor','Online',1),
(2,'AP-Lab-02','10.10.10.12','Computer Lab 2','Online',1),
(3,'AP-Staff-01','10.10.20.10','Staff Offices','Online',2),
(4,'AP-Hall-Guest','10.10.30.5','Main Hall','Maintenance',3);

-- Insert sample login sessions to test session management.
INSERT INTO Session_Log
VALUES
(1,GETDATE(),NULL,'Allowed',1,1,1),
(2,GETDATE(),NULL,'Allowed',2,3,2),
(3,GETDATE(),NULL,'Allowed',3,4,2),
(4,GETDATE(),NULL,'Allowed',4,5,3),
(5,GETDATE(),GETDATE(),'Denied',5,6,4);

-- Insert sample usage records for traffic analysis.
INSERT INTO Usage_Log
VALUES
(1,412.25,154.50,GETDATE(),1),
(2,888.15,185.30,GETDATE(),2),
(3,95.40,41.75,GETDATE(),3),
(4,79.60,27.30,GETDATE(),4);

-- Insert sample recommendations for each role.
INSERT INTO Recommendation
VALUES
(1,'Connect Student to FCI-Students','Best network for normal student traffic',1,1),
(2,'Connect Staff to FCI-Staff','Staff needs protected access',2,2),
(3,'Connect Admin to FCI-Staff','Admin uses secure internal network',3,2),
(4,'Connect Guest to FCI-Guest','Guest should be isolated from internal network',4,3);

------------------------------------------------------------
--10.
-- Link each user to one role using a foreign key.
ALTER TABLE [User]
ADD CONSTRAINT FK_User_Role
FOREIGN KEY (Role_Id)
REFERENCES Role(Role_Id);

--11.
-- Link each device to its owner user.
ALTER TABLE Device
ADD CONSTRAINT FK_Device_User
FOREIGN KEY (User_Id)
REFERENCES [User](User_Id);

--12.
-- Link each access point to the WiFi network it belongs to.
ALTER TABLE AccessPoint
ADD CONSTRAINT FK_AccessPoint_Network
FOREIGN KEY (Network_Id)
REFERENCES WiFiNetwork(Network_Id);

--13.
-- Link each session to the logged-in user.
ALTER TABLE Session_Log
ADD CONSTRAINT FK_Session_User
FOREIGN KEY (User_Id)
REFERENCES [User](User_Id);

--14.
-- Link each session to the device used in that session.
ALTER TABLE Session_Log
ADD CONSTRAINT FK_Session_Device
FOREIGN KEY (Device_Id)
REFERENCES Device(Device_Id);

--15.
-- Link each session to the access point used for connection.
ALTER TABLE Session_Log
ADD CONSTRAINT FK_Session_AccessPoint
FOREIGN KEY (AccessPoint_Id)
REFERENCES AccessPoint(AccessPoint_Id);

--16.
-- Link each usage record to its session.
ALTER TABLE Usage_Log
ADD CONSTRAINT FK_Usage_Session
FOREIGN KEY (Session_Id)
REFERENCES Session_Log(Session_Id);

--17.
-- Link each recommendation to a role.
ALTER TABLE Recommendation
ADD CONSTRAINT FK_Recommendation_Role
FOREIGN KEY (Role_Id)
REFERENCES Role(Role_Id);

--18.
-- Link each recommendation to a WiFi network.
ALTER TABLE Recommendation
ADD CONSTRAINT FK_Recommendation_Network
FOREIGN KEY (Network_Id)
REFERENCES WiFiNetwork(Network_Id);

--19.
-- Link each admin action to a related user when needed.
ALTER TABLE Admin_Action
ADD CONSTRAINT FK_AdminAction_User
FOREIGN KEY (User_Id)
REFERENCES [User](User_Id);

--20.
-- Allow only valid user status values.
ALTER TABLE [User]
ADD CONSTRAINT CHK_User_Status
CHECK (Status IN ('Active','Suspended'));

--21.
-- Allow only valid device type values.
ALTER TABLE Device
ADD CONSTRAINT CHK_Device_Type
CHECK (Device_Type IN ('Laptop','Mobile','Tablet','Other'));

--22.
-- Allow only valid session status values.
ALTER TABLE Session_Log
ADD CONSTRAINT CHK_Session_Status
CHECK (Auth_Status IN ('Allowed','Denied','Expired'));

------------------------------------------------------------
--23.
-- Show all users stored in the system.
SELECT * FROM [User];

--24.
-- Show only user names and emails.
SELECT Full_Name , Email
FROM [User];

--25.
-- Show all different status values without repetition.
SELECT DISTINCT Status
FROM [User];

--26.
-- Show only active users.
SELECT *
FROM [User]
WHERE Status = 'Active';

--27.
-- Show devices that are laptops only.
SELECT *
FROM Device
WHERE Device_Type = 'Laptop';

--28.
-- Show access points that are currently online.
SELECT *
FROM AccessPoint
WHERE Status = 'Online';

--29.
-- Show sessions that were successfully allowed.
SELECT *
FROM Session_Log
WHERE Auth_Status = 'Allowed';

--30.
-- Show users who own at least one trusted device.
SELECT *
FROM [User]
WHERE User_Id IN (
    SELECT User_Id FROM Device
    WHERE Is_Trusted = 1
);

--31.
-- Show users whose devices are not blocked in the subquery result.
SELECT *
FROM [User]
WHERE User_Id NOT IN (
    SELECT User_Id FROM Device
    WHERE Is_Trusted = 0
);

--32.
-- Get the maximum daily data limit among all roles.
SELECT MAX(Max_Daily_Data_MB)
FROM Role;

--33.
-- Get the average download amount from all usage records.
SELECT AVG(Download_MB)
FROM Usage_Log;

--34.
-- Show usage records whose download is greater than the average.
SELECT *
FROM Usage_Log
WHERE Download_MB > (
    SELECT AVG(Download_MB)
    FROM Usage_Log
);

------------------------------------------------------------
--35.
-- Suspend the guest user account.
UPDATE [User]
SET Status = 'Suspended'
WHERE User_Id = 5;

--36.
-- Change one device type to Other.
UPDATE Device
SET Device_Type = 'Other'
WHERE Device_Id = 6;

--37.
-- Return the guest access point to online status.
UPDATE AccessPoint
SET Status = 'Online'
WHERE AccessPoint_Id = 4;

--38.
-- Update the recommendation text for students.
UPDATE Recommendation
SET Recommended_Action = 'Connect Student to FCI-Students and least loaded AP'
WHERE Recommendation_Id = 1;

------------------------------------------------------------
--39.
-- Delete one usage record by its primary key.
DELETE FROM Usage_Log
WHERE Log_Id = 4;

--40.
-- Delete one denied session by its primary key.
DELETE FROM Session_Log
WHERE Session_Id = 5;

------------------------------------------------------------
--41.
-- Create a view that shows active users only.
CREATE VIEW Active_Users_View AS
SELECT Full_Name , Email , Status
FROM [User]
WHERE Status = 'Active';

--42.
-- Create a view that joins users, roles, networks, and recommendations.
CREATE VIEW Recommendation_View AS
SELECT U.Full_Name , R.Role_Name , W.SSID , RC.Recommended_Action
FROM [User] U , Role R , WiFiNetwork W , Recommendation RC
WHERE U.Role_Id = R.Role_Id
AND RC.Role_Id = R.Role_Id
AND RC.Network_Id = W.Network_Id;

------------------------------------------------------------
--43.
-- Create a stored procedure to show active allowed sessions.
CREATE PROCEDURE ShowActiveSessions
AS
BEGIN
    SELECT *
    FROM Session_Log
    WHERE Auth_Status = 'Allowed';
END;

--44.
-- Execute the stored procedure.
EXEC ShowActiveSessions;
