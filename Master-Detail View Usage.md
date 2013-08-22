Master-Detail View Usage
===================
I([tslmy](http://www.tslimi.tk/)) think _Ratchet_ should not limit its great power to iPhone and iPod touch. Instead, iPad should be taken into consideration as well. The most different part in styling an app(between iPhone/iPod touch and iPad, of course) is that iPad has a "master-detail" view. While iPhone/iPod touch switches from master view and detail view back and forth, iPad show them simultaneously.

Best example is your Settings app.

Usage
------
Since I haven't merge my code into _Ratchet_ itself, you have to import/link to/include my files manually.

This can be achieved by adding the following codes into `<head>`:
	<script src="inobounce.min.js"></script>
    <link rel="stylesheet" href="overallfixing.css">
    <link rel="stylesheet" href="masterdetail.css">

(Yes, I highly recommend you add `inobounce.min.js`, which solve the problem of _moving the view up and down_ perfectly.)

Then, change `<body>` into:
    <body class="masterDetail">

Wrap a panel(an orginal page, or "`<body>`") with `<div class="master">` and another with `<div class="detail">`.

You are good to go.

To do
-----
1. Currently, `masterdetail.js` is still empty(so there's no need to include it in `<head>` presently). 

2. List links in master panel should target at detail panel.

3. Some apps may want the detail panel to take over the whole screen, leaving master panel sliding in and out from the left side.