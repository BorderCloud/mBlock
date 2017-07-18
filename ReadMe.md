# mBlock

The mBlock is a branch of on the [Scratch 2.0 offline version](https://github.com/LLK/scratch-flash). It adds support of Makeblock products and other Arduino-based boards.

You can get more information or [download a release build at the mBlock website](http://www.mblock.cc)

# 4.0

This is a future version of mBlock. Based on Electron.

# Build guide

Just standard npm stuff. You know that.

(If you want to use the Arduino features, put the arduino executable folder under /tools)

npm install  
npm run rebuild-serialport  
npm run rebuild-hid  
npm run rebuild-bluetooth  
npm start


# Repo Status

version 3.4.5(in branch 3.4.5) is the currently released version, is considered a "stable" version and will not be actively updated. However, if you find any bugs, welcome to fire a pull request.

If you want to work with translation, or find errors in the translations, [please read this document on how to translate mBlock](http://www.mblock.cc/posts/note-for-translators). This Git repo does not accept pull requests on translating the texts.

# Installer

[Download for windows/mac at the mBlock website](http://www.mblock.cc)

# Translations

If you want to work with translation, or find errors in the translations, [please read this document on how to translate mBlock](http://www.mblock.cc/posts/note-for-translators). This Git repo does not accept pull requests on translating the texts.


# How to Use With Mblock Already Installed

1-remplace your Mbot extension

	the mBot exstension is normaly located at "C:\Users\YourUserProfile\AppData\Roaming\com.makeblock.Scratch3.4.10\Local Store\mBlock\libraries" 
	it can also be located with makeblock : (Extensions > Manage Extensions > Installed >  Mbot > View Source) 
	
	one you get the mBot folder remplace it with the mBot extension present in this project,
	wich can be located at ./mBlock\web\flash-core\ext\libraries\mbot 

2-Push the good program in your mBot
	
	connect your mbot to your computer
	turn ON your mBot 
	open arduino(to do that, you can open mBLock in admin mode, go to arduino mode [edit > Arduino mode], and click on "Edit with Arduino IDE")

	Push the file called mbotRFID.ino located at (./mBlock\src\firmware\mbot_firmware) into your mbot (to do that click on the (->) button in the arduino IDE) 

3-test

	relaunch Mblock
	activate the extension if it's not already done(Extension> MakeBlock)
	connect the mBot to Mblock(Connect > Serial Port > yourPort)

	you are ready to go.
