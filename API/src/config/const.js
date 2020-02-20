const QUERIES = {
  CHAT: {
    GET_MESSAGES: 'SELECT users_messages.id, \
      users_messages.seen,\
      users_messages.sender_id,\
      a.username AS `sender`,\
      users_messages.receiver_id,\
      b.username AS `receiver`,\
      Convert(`content`, CHAR CHARACTER SET utf8mb4) as content,\
      DATE_FORMAT(users_messages.creation,"%Y-%m-%d %h:%i:%s") AS \
      creation, profile_pictures.profile_pic, b.is_connection\
    FROM users_messages\
    LEFT JOIN users a ON users_messages.sender_id = a.id\
    LEFT JOIN users b ON users_messages.receiver_id = b.id\
    INNER JOIN \
    ( SELECT users_pictures.user_id, users_pictures.filename AS profile_pic \
      FROM users_pictures \
      WHERE users_pictures.is_profile_pic = 1 ) \
      AS profile_pictures ON profile_pictures.user_id = a.id\
    WHERE owner_id = ? AND with_id = ?\
    ORDER BY creation DESC',
    ADD_MESSAGE: 'INSERT INTO `users_messages` (`owner_id`, `with_id`, `sender_id`, `receiver_id`, `content`) VALUES (?, ?, ?, ?, ?), (?, ?, ?, ?, ?);',
    DELETE_CONVERSATION: 'DELETE FROM `users_messages` WHERE `owner_id` = ? AND `with_id` = ? ;',
    DELETE_CONVERSATIONS: 'DELETE FROM `users_messages` WHERE `owner_id` = ?;',
    GET_CONVERSATION: 'SELECT o.*, users.username from users_messages o \
    LEFT JOIN users_messages b ON o.with_id = b.with_id AND \
      o.creation < b.creation \
      LEFT JOIN users on o.with_id = users.id \
      WHERE b.creation is null AND o.owner_id = ? \
      order BY b.creation DESC',
      GET_CHAT: 'SELECT *, profile_pictures.profile_pic FROM `users` \
              INNER JOIN  \
             ( SELECT users_pictures.user_id, users_pictures.filename AS profile_pic \
               FROM users_pictures \
               WHERE users_pictures.is_profile_pic = 1 ) \
               AS profile_pictures ON profile_pictures.user_id = users.id \
               WHERE users.id = ?',
  },
    USERS: {
      DELETE_USER: {
        USER: 'DELETE FROM `users` WHERE `id` = ? LIMIT 1;',
        BLOCKED: 'DELETE FROM `users_blocked` WHERE `blocker_id` = ? OR `blocked_id` = ?;',
        LIKES: 'DELETE FROM `users_likes` WHERE `liker_id` = ? OR `liked_id` = ?;',
        MESSAGES: 'DELETE FROM `users_messages` WHERE `sender_id` = ? OR `receiver_id` = ?;',
        NOTIFICATIONS: 'DELETE FROM `Notification` WHERE `ID` = ?;',
        PICTURES: 'DELETE FROM `users_pictures` WHERE `user_id` = ?;',
        REGISTRATION: 'DELETE FROM `users_registration` WHERE `user_id` = ?;',
        },
        ADD_USER: 'INSERT INTO `users`( `firstname`, `lastname`, `username`, `password`, `email`) VALUES(?, ?, ?, ?, ?)',
        ADD_USER_TOKEN: 'INSERT INTO `user_token` (`token`, `userid`, `date_expir`) VALUES(?, ?, ?)',
        ADD_LIKE: 'INSERT INTO `users_likes` (`liker_id`, `liked_id`) VALUES (?, ?);',
        DELETE_LIKE: 'DELETE FROM `users_likes` WHERE `liker_id`= ? AND `liked_id` = ? ;',
        GET_LIKE: 'SELECT COUNT(*) AS count FROM `users_likes` WHERE `liker_id` = ? AND`liked_id` = ?;',
        GET_LIKES: [
            'SELECT * FROM `users_likes` LEFT JOIN `users` ON `users_likes`.`liker_id` = `users`.`id` WHERE `users_likes`.`liked_id` = ? ORDER BY `users_likes`.`date` DESC ;',
            'SELECT * FROM `users_likes` LEFT JOIN `users` ON `users_likes`.`liked_id` = `users`.`id` WHERE `users_likes`.`liker_id` = ? ORDER BY `users_likes`.`date` DESC ;',
          ],
        GET_TAGS: 'SELECT  `tags` FROM `Tags`',
        ADD_BLOCK: 'INSERT INTO `users_blocked` (`blocker_id`, `blocked_id`) VALUES (?, ?);',
        DELETE_BLOCK: 'DELETE FROM `users_blocked` WHERE `blocker_id` = ? AND `blocked_id` = ? LIMIT 1;',
        GET_BLOCK: 'SELECT COUNT(*) AS count FROM `users_blocked` WHERE `blocker_id` = ? AND `blocked_id` = ? ;',
        UP_USER_DETAILS: 'UPDATE `users` SET `firstname`=?,`lastname`=?,`username`=?,`password`=?,`email`=?, `birthday`=?,`gender`=?,`Biography`=?, `tags`=?, `profileComplete`=?, `latitude`=?, `longitude`=?, `Age`=?, `orientation`=? WHERE id=?',
        UPDATE_PASSWORD: 'UPDATE `users` SET `password`=? where id=?',
        GET_USERNAME_AND_EMAIL: 'SELECT `username`, `email`, FROM `users` WHERE `id` = ?',
        BY_USERNAME_EMAIL: 'SELECT COUNT(*) AS count FROM `users` WHERE `username` = ? OR `email` = ? LIMIT 1',
        SET_ACCOUNT_CONFIRMED: 'UPDATE `users` SET `confirmed` = 1 WHERE `id` = ?' ,
        SET_GENERAL_INFO: 'UPDATE `users` SET ?? = ? WHERE `id` = ?',
        GET_USER: 'SELECT `id`, `firstname`, `lastname`, `username`, `password`, `email`, `confirmed`,  DATE_FORMAT(birthday, "%Y-%m-%d") as `birthday`, `gender`, `Biography`, `tags`, `profileComplete`,\
        `latitude`, `longitude`, `Age`, `last_connection`, `is_connection`, `popularity`, `orientation` FROM `users` WHERE username = ? AND password = ?',
        GET_NAME: 'SELECT * FROM `users` WHERE username = ?',
        GET_COUNT_BY_USERNAME_AND_EMAIL: 'SELECT COUNT(*) AS count FROM `users` WHERE `username` = ? OR `email` = ? LIMIT 1;',
        ADD_REGISTRATION_TOKEN: 'INSERT INTO `users_registration` (`token`, `user_id`, `expiration_date`) VALUES (?, ?, NOW() + INTERVAL 1 DAY);',
        DELETE_REGISTRATION_TOKEN: 'DELETE FROM `users_registration` WHERE `token` = ?',
        GET_REGISTRATION_TOKEN: 'SELECT `user_id` FROM `users_registration` WHERE `token` = ? AND `expiration_date` > NOW()',
        UPDATE_USERS:'UPDATE `users` SET firstname`=?,`lastname`=? WHERE id=?',
        UPDATE_TOKEN: 'UPDATE `users` SET `token`=? WHERE id=?',
        GET_ALL_USERS: 'SELECT users.id, users.firstname, users.lastname, users.username,\
        users.tags, users.popularity,\
        users.email, users.age, users.confirmed, users.is_connection, \
        users.birthday, users.gender, users.Biography, users.latitude, \
        users.longitude, users.orientation, profile_pictures.profile_pic,  DATE_FORMAT(`last_connection`,"%Y-%m-%d %h:%i:%s") AS `last_connection`, \
         likes.liker_id FROM users \
        INNER JOIN \
        ( SELECT users_pictures.user_id, users_pictures.filename AS profile_pic \
         FROM users_pictures \
         WHERE users_pictures.is_profile_pic = 1 ) \
         AS profile_pictures ON profile_pictures.user_id = users.id\
          LEFT JOIN\
        (SELECT users_likes.liker_id\
        FROM users_likes\
        WHERE users_likes.liked_id = ? ) AS likes ON likes.liker_id = users.id \
        WHERE users.confirmed = 1 \
        AND NOT users.id = ? \
        AND users.id NOT IN (\
        SELECT users_blocked.blocked_id FROM users_blocked\
        WHERE users_blocked.blocker_id = ?)\
        AND users.id NOT IN ( \
        SELECT users_blocked.blocker_id FROM users_blocked \
        WHERE users_blocked.blocked_id = ? )\
        ORDER BY users.username asc',
        GET_ALL_MAP: 'SELECT users.id, users.firstname, users.lastname, users.username,\
        users.tags, users.popularity,\
        users.email, users.age, users.confirmed, users.is_connection, \
        users.birthday, users.gender, users.Biography, users.latitude, \
        users.longitude, users.orientation, profile_pictures.profile_pic,  DATE_FORMAT(`last_connection`,"%Y-%m-%d %h:%i:%s") AS `last_connection` FROM users \
        INNER JOIN \
        ( SELECT users_pictures.user_id, users_pictures.filename AS profile_pic \
         FROM users_pictures\
         WHERE users_pictures.is_profile_pic = 1 ) \
         AS profile_pictures ON profile_pictures.user_id = users.id\
         ORDER BY users.username',
        GET_USER_BY_ID: 'SELECT `id`, `firstname`, `lastname`, `username`, `password`, `email`, `confirmed`, DATE_FORMAT(birthday, "%Y-%m-%d") as birthday,\
         `gender`, `Biography`, `tags`, `profileComplete`, `latitude`, `longitude`, `Age`, DATE_FORMAT(`last_connection`,"%Y-%m-%d %h:%i:%s") AS `last_connection`, \
         `is_connection`, `popularity`, `orientation` FROM `users` WHERE users.id=?',
        GET_USER_BY_EMAIL: 'SELECT `id`, `firstname`, `lastname`, `username`, `password`, `email`, `confirmed`, DATE_FORMAT(birthday, "%Y-%m-%d") as birthday, `gender`, `Biography`, `tags`, `profileComplete`, `latitude`, `longitude`, `Age`, `last_connection`, `is_connection`, `popularity`, `orientation` FROM `users` WHERE users.email=?',
        ADD_TAG: 'INSERT INTO `Tags`(`usr_id`, `name`) VALUES (?,?)',
        PUT_ONE: 'UPDATE `users` SET `profileComplete`= 1 WHERE `id`=?',
        ADD_PICTURE: 'INSERT INTO `users_pictures` (`user_id`, `filename`, `is_profile_pic`) VALUES (?, ?, ?);',
        DELETE_PICTURE: 'DELETE FROM `users_pictures` WHERE `user_id` = ? AND `filename` = ? LIMIT 1;',
        GET_PICTURES: 'SELECT `filename`, `is_profile_pic`, `import` FROM `users_pictures` WHERE `user_id` = ? ORDER BY `is_profile_pic` DESC, `import` DESC;',
        SET_PROFILE_PICTURE: 'UPDATE `users_pictures` SET `is_profile_pic` = ? WHERE `filename` = ?;',
        UP_REGISTRATION_TOKEN: 'UPDATE `users_registration` SET `token`=?,`expiration_date`=NOW() + INTERVAL 1 DAY WHERE user_id=?;',
        FIND_ID: 'SELECT * FROM `users_registration` WHERE user_id=?',
        SET_DISCONNECTED: 'UPDATE `users` SET `is_connection` = 0, `last_connection` = NOW() WHERE `id` = ?;',
        SET_CONNECTED: 'UPDATE `users` SET `is_connection` = 1 WHERE `username` = ?;',
        GET_ALL: 'SELECT *, DATE_FORMAT(birthday, "%Y-%m-%d") as date FROM `users` INNER JOIN users_pictures ON users.id = users_pictures.user_id where users.id=?',
        TAG_SUP: 'INSERT INTO `Tags`(tags) VALUES (?)',
        SEE_PROFILE: 'INSERT INTO `See_profile`(`id_user`, `id_ss`, `time`, `user`) VALUES (?,?,NOW(),?)',
        ADD_POP: 'UPDATE `users` SET `popularity`=? where id=?',
        GET_USERNAME_EMAIL: 'SELECT `username`, `email` FROM `users` WHERE `id` = ?;',
        ADD_REPORT: 'INSERT INTO `users_fakes` (`reporter_id`, `reported_id`) VALUES (?, ?);',
        GET_BLOCK_LIST: 'SELECT users.id, users.firstname, users.lastname, users.username, \
        profile_pictures.profile_pic \
        FROM users \
      INNER JOIN \
      ( SELECT users_pictures.user_id, users_pictures.filename AS profile_pic \
        FROM users_pictures \
        WHERE users_pictures.is_profile_pic = 1 ) \
        AS profile_pictures ON profile_pictures.user_id = users.id\
      INNER JOIN `users_blocked` ON users.id = users_blocked.blocked_id \
      WHERE users_blocked.blocker_id = ?',
      GET_BLOCKED:'SELECT blocker_id,blocked_id FROM `users_blocked` WHERE `blocker_id` = ? AND `blocked_id` = ?',
      ADD_NOTIFICATION: 'INSERT INTO `Notification`(`notification`, `Time`, `ID`, `id_user`) VALUES (?,NOW(),?,?)',
      VU: 'UPDATE `Notification` SET `vu`=? WHERE id=?',

      },

    JSON_WEB_TOKEN: {
        ADD_BLACKLIST: 'INSERT INTO `tokens_blacklist` (`token`) VALUES (?);',
        GET: 'SELECT COUNT(*) AS count FROM `tokens_blacklist` WHERE `token` = ?;',
    },

}

module.exports = QUERIES
