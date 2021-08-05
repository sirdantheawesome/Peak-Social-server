# ![](https://ga-dash.s3.amazonaws.com/production/assets/logo-9f88ae6c9c3871690e33280fcf557f33.png) GA Project 3 - Peak Social Media

## Overview

For our third project at GA we had to make a full stack web app using the React framework for the front end and Express as for the back end (MERN stack). I worked in a group of three with Craig Clement and Bradley Bernard. We could come up with our own idea for the project but we all had to work on at least a bit of the front and back end each.

### Links

https://peek3.netlify.app/ <-- Try it here!

https://github.com/sirdantheawesome/Peak-Social-client <-- Frontend

https://github.com/sirdantheawesome/Peak-Social-server <-- Backend

### Members

- Craig Clement - [Github](https://github.com/CraigClem)
- Dan Fullerton - [Github](https://github.com/sirdantheawesome)
- Bradley Bernard - [Github](https://github.com/bradb345)

## The Brief

- Make a website using MERN full stack.
- Work in small groups of three or four.
- Complete the project in one week.
- Deploy the project online and connect the front end to the back end.

## Approach

The Idea for the Peak Social Media was to mimic popular social media sites and implement a lot of the core funtionality. The twist we decided to put in was to incorporate points which you gain for interacting on the site and other users.

## Planning

We started off the planning by discussing the core features we wanted in the app, these were:

- User sign up and login.
- User profile editing with profile pictures.
- Making posts and having them show up on the feed.
- Users interacting with posts (Like, comment, edit, remove).
- Mobile scaling.
- Post filtering and search.

We then moved onto whiteboarding the app, laying out roughly how it would look and function.

Login:
<img src='ScreenCaps\login.png'>

Feed:
<img src='ScreenCaps\feed.png'>

Profile:
<img src='ScreenCaps\profile.png'>

## Work Assignment

We decided the best way forward would be to start working on the backend first as we could then build off the frontend. We assigned tasks by having a daily discussion on what was done and what needed to be done.

I started work on some of the boilerplate files we would need and putting in placeholders to make it easier to create and edit later. I then moved onto setting up the various routes we would need for the frontend.

```js
import express from "express";
import commentController from "../controllers/comments.js";
import postController from "../controllers/posts.js";
import userController from "../controllers/users.js";

import secureRoute from "../middleware/secureRoute.js";

const router = express.Router();

// * Post

router
  .route("/posts")
  .get(postController.index)
  .post(secureRoute, postController.createPost);

router
  .route("/posts/:postId")
  .get(postController.show)
  .put(secureRoute, postController.updatePost)
  .post(secureRoute, postController.likePost)
  .delete(secureRoute, postController.removePost);

// * Comments

router
  .route("/posts/:postId/comments")
  .post(secureRoute, commentController.createComment);

router
  .route("/posts/:postId/comments/:commentId")
  .put(secureRoute, commentController.updateComment)
  .post(secureRoute, commentController.likeComment)
  .delete(secureRoute, commentController.removeComment);

// * User Profiles

router.route("/profile").get(userController.indexProfiles);

router
  .route("/profile/:profileId")
  .put(secureRoute, userController.updateProfile)
  .get(userController.showProfile);

// * Auth

router.route("/login").post(userController.login);

router.route("/register").post(userController.register);

export default router;
```

After the backend was working with its first version we moved on to the frontend. I was in charge of setting up the nav bar initially and then moved on to the actual posts. The posts included displaying content, users who posted and liked, changing based on which user was logged in etc. One thing that was important to me was that it all worked intuitively and would be easy to navigate due to all the linked sections like user names and icons.

```js
return (
  <nav className="navbar is-light">
    <div className="container">
      <div className="navbar-start">
        <Link to="/feed" className="navbar-item">
          <img
            className="image"
            src="https://www.acousticbulletin.com/wp-content/uploads/2020/01/70-706384_illuminati-clipart-all-illuminati-logo-png.png"
          />
        </Link>
      </div>
      <div className="container">
        <div className="navbar-item">
          <input
            onKeyUp={handleInput}
            className="input"
            type="text"
            placeholder="Search"
          />
        </div>
      </div>
      <div className="navbar-end">
        <div className="container">
          <div className="navbar-item">
            {isLoggedIn && (
              <Link to={`/profile/${getCurrentUserId()}`} className="button">
                Profile
              </Link>
            )}
          </div>
        </div>
        <div className="container">
          <div className="navbar-item">
            {!isLoggedIn ? (
              <>
                <Link to="/" className="button is-warning">
                  Log In / Register
                </Link>
              </>
            ) : (
              <button className="button is-warning" onClick={handleLogout}>
                Logout
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  </nav>
);
```

I used a modal to make the card pop out if it is clicked in a place which isn't a button. This way the post can be viewed in a more focused way like many popular social media sites have.

```js
return (
    <div className='column is-full'>
      <div className={popup1}>
        <div className="modal-background"></div>
        <div className="modal-card">
          <header className="modal-card-head">
            <p className="modal-card-title">Edit your post!</p>
            <button onClick={handleClose} className="delete" aria-label="close"></button>
          </header>
          <section className="modal-card-body">
            <PostEdit setPopup1={setPopup1} postId={postId} handleUpdatePosts={handleUpdatePosts} />
          </section>
        </div>
      </div>
      <div className={popupComment}>
        <div className="modal-background"></div>
        <div className="modal-card">
          <header className="modal-card-head">
            <p className="modal-card-title">Add a comment!</p>
            <button onClick={handleClose} className="delete" aria-label="close"></button>
          </header>
          <section className="modal-card-body">
            <PostComment setPopupComment={setPopupComment} postId={postId} handleUpdatePosts={handleUpdatePosts} />
          </section>
        </div>
      </div>
      <div onClick={handlePostOpen} className="card m-5">
        <PostSection
          title={title}
          text={text}
          image={image}
          userId={userId}
          likedByArray={likedByArray}
          author={author}
          postId={postId}
          handleUpdatePosts={handleUpdatePosts}
          setPopup1={setPopup1}
          setPopup={setPopup}
          setPopupComment={setPopupComment}
        />
        {comments &&
          <CommentSection
            comments={comments}
            maxComments={2}
          />
        }
        <div className={popup}>
          <div onClick={handlePostClose} className="modal-background"></div>
          <div className="modal-content has-background-white">
            <PostSection
              title={title}
              text={text}
              image={image}
              userId={userId}
              likedByArray={likedByArray}
              author={author}
              postId={postId}
              handleUpdatePosts={handleUpdatePosts}
              setPopup1={setPopup1}
              setPopup={setPopup}
              setPopupComment={setPopupComment}
            />
            <CommentSection
              comments={comments}
            />
          </div>
          <button onClick={handlePostClose} className="modal-close is-large" aria-label="close"></button>
        </div>
      </div>
    </div>
  )
}
```

### Visuals

We used a CSS framework called Bulma to style the frontend, we tried to keep it layed out similar to popular social media apps with a central feed. I think the site turned out looking very good and very consistent through out.

<img src='ScreenCaps\Profile-site.png'>
<img src='ScreenCaps\Modal.png'>

## What I learnt

We had to go back and change the back end a couple of times and shift around how we did things on the front end a few times. I think in general I learnt that much more thorough planning at the beginning saves a lot of time later on and is well worth doing. Also communicating with team mates was very important and something we did well on this project, without this I think it would have been much more challenging.

## Challenges

In general I think we managed to get a lot done in the time frame we had considering how much goes into a social media site but I do think time limitations were a challenge. We had some stretch goals we didn't manage to achieve which we would have been able to given more time. I also underestimated how long simply just the Post display card would take to make and that had most of my time throughout the entire project.

## Wins

The project turned out really great and actually incredibly functional. We all had a bit of fun added funny posts to the app and interacting with all of them. We all learnt a lot about work flow in a team and connecting front and backends. It was a massive confidence boost and was a really fun project to work on!
