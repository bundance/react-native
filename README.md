# IMPORTANT! PLEASE READ... 

## Two things to note when using this app:
- The second part of the test states that a message's author's email should be shown when the user hovers their mouse over a message. However, this code is for an iOS app, which has no concept of a mouse! So I've had to improvise, and I've used React Native's touch API instead. So instead of hovering over a message to see the email, simply touch on the message (either with a mouse click if it's on the simulator, or with a finger if it's on an iPhone) instead, and you'll see the email appear.

- The original `members.json` data uses avatar images from `http://dummyimage.com`, but `dummyimage.com` now redirects all requests made using `http://` to the `https://` protocol scheme. Not sure if it's part of the test to debug this, but the code I've written here replaces `http://dummyimage.com/...` with `https://dummyimage.com/...` to successfully render the avatar. It does this in a memoized selector, so it's only done once.

## ToDo
- More tests. I only added unit tests for some of the selectors and reducers. For production code, everything would be unit tested, including the components (using Enzyme). However, time constraints meant I had to limit the tests I wrote.
- Create the native iOS module and link it to React Native. I've not written a native iOS module before, so  ¯\_(ツ)_/¯
Happy to give this a go if needed, though.

# (ORIGINAL README:) NowTV React Interview

![NowTV](./logo.png)

A simple React + Redux project to retrieve, render and manipulate data returned from an API.

This coding is tested on Xcode version 9.2

## Commands

- **npm install**: To install npm-packages,
- **npm run start:ios**: Runs the application in developer mode, alternatively: run the application in Xcode

## Tasks

The application only has to run on iOS, you don't have to test it on other platforms

Feel free to create new files to help you complete these tasks. Additional dependencies can be installed, if you think they are necessary

`App.js` is your react entry point, it is connected to the redux store

`data.js` is a mocked-API which exposes methods to get message information and member information from a chatroom.

It has two publically exposed functions `getMessages` and `getMembers`. Your tasks will be to add further logic to display and manipulate the data returned from these functions, without modifying `data.js`

`service.js` currently consumes `data.js` to retrieve a list of messages, and put them into the redux store. 

Do not modify `data.js` to achieve these tasks, and do not worry about the styling. Code addition should be unit tested. Any changes in iOS code don't have to be unit tested.

1. Render the list of messages from the redux store

2. Display the user's email when you hover over the message.

3. Display the avatar of the user next to the message

5. Create a native iOS module that provides you with a timestamp and send this value to React Native

4. Display and format the timestamp of the message to be human readable

5. Sort the messages by time

## Submission

Please upload your solution to your github account as a public repository, and send the URL to us.
