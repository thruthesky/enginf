import { testCreateCategory, testCreatePost, testUpdateUser, getRandomInt, testCreateComment, forceUserLoginByEmail } from "../helpers/global-functions";

import * as assert from 'assert';
import { admin } from "../init/init.firebase";
import { EngineSettings, TestSettings } from "../settings";
import { UserRecord } from "firebase-functions/lib/providers/auth";
import { CommentData } from "../comment/comment.interfaces";
import { PostData } from "./post.interfaces";
import { CategoryData } from "../category/category.interfaces";



let category: CategoryData;
let post: PostData;
let post2: PostData;
let comment: CommentData;
let testUser: UserRecord;
let updatedUser: UserRecord;
let adminUser: UserRecord;
let url: string;



describe('Adding user data to post & comment', function () {
    this.timeout(20000);

    /// Test if `addingForumUserFromAuth` is true.
    if (EngineSettings.addForumUserDataFromAuth) {

        it('Create a post  And test user data.', async () => {

            category = await testCreateCategory(); /// This automatically let user login as admin
            await testUpdateUser({ displayName: 'admin' });
            await forceUserLoginByEmail(TestSettings.emails[0]);


            /// reset user data cache before creating a post.
            await testUpdateUser({ displayName: 'user1' });
            /// Create post as user. This automatically let user login as a user.
            post = await testCreatePost(TestSettings.emails[0], [category.id]);
            // console.log('post 1: ', post);
            testUser = await admin().auth().getUserByEmail(TestSettings.emails[0]); // Get user data
            adminUser = await admin().auth().getUserByEmail(EngineSettings.adminEmails[0]);
            assert.equal(post.displayName, testUser.displayName);
            assert.notDeepEqual(post.displayName, adminUser.displayName);

        });
        it('Change photo url & text', async () => {

            /// Change photo url
            url = 'https://photourl.com/test' + getRandomInt(1, 9900000) + '.jpg';
            await testUpdateUser({ uid: testUser.uid, photoURL: url });
            // console.log('testUpdateUser', uu);
            post2 = await testCreatePost(TestSettings.emails[0], [category.id]);
            // console.log('post2:', post2);  
            assert.notEqual(post.photoUrl, post2.photoUrl);

            updatedUser = await admin().auth().getUserByEmail(TestSettings.emails[0]); // Get updated user data
            assert.equal(post2.photoUrl, updatedUser.photoURL);
        });

        it('Create a comment & test', async () => {

            comment = await testCreateComment(post.id!, '...');
            assert.equal(comment.displayName, updatedUser.displayName);
            assert.equal(comment.photoUrl, updatedUser.photoURL);
        });
    } else {
        it('Create a post  And test user data.', async () => {

            category = await testCreateCategory(); /// This automatically let user login as admin
            await testUpdateUser({ displayName: 'admin' });

            await forceUserLoginByEmail(TestSettings.emails[0]);
            await testUpdateUser({ displayName: 'user1' });

            testUser = await admin().auth().getUserByEmail(TestSettings.emails[0]); // Get user data
            adminUser = await admin().auth().getUserByEmail(EngineSettings.adminEmails[0]);


            /// Create post as user. This automatically let user login as a user.
            post = await testCreatePost(TestSettings.emails[0], [category.id]);
            
            assert.equal(post.displayName, testUser.displayName);
            assert.notDeepEqual(post.displayName, adminUser.displayName);

        });


        it('Change photo url & text', async () => {

            /// Change photo url
            url = 'https://photourl.com/test' + getRandomInt(1, 9900000) + '.jpg';
            await testUpdateUser({ uid: testUser.uid, photoURL: url });
            testUser = await admin().auth().getUserByEmail(TestSettings.emails[0]); // Get user data
            
            // console.log('testUpdateUser', uu);
            post2 = await testCreatePost(TestSettings.emails[0], [category.id]);
            // console.log('post2:', post2);  
            assert.notEqual(post.photoUrl, post2.photoUrl);
            assert.equal(post2.photoUrl, testUser.photoURL);

        });



        it('Create a comment & test', async () => {
            comment = await testCreateComment(post.id!, '...');
            assert.equal(comment.displayName, testUser.displayName);
            assert.equal(comment.photoUrl, testUser.photoURL);
        });

    }
});
