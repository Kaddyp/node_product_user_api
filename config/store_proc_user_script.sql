DELIMITER //

-- Create stored procedure to read User
CREATE PROCEDURE GetUser()
BEGIN
    SELECT * FROM User;
END //

-- Create stored procedure to insert a new User
CREATE PROCEDURE InsertUser(IN userName_content VARCHAR(255), IN email_content TEXT, IN password_content TEXT, IN roleNames_content TEXT )
BEGIN
    INSERT INTO Course 
    (userName, email, password, roleNames) 
    VALUES (userName_content, email_content, password_content, roleNames_content);
END //

DELIMITER ;