#!/usr/bin/gjs

const Gtk = imports.gi.Gtk;
const Lang = imports.lang;
const WebKit = imports.gi.WebKit;

function SC2Browser () {
  this._init ();
}

SC2Browser.prototype = {
  _init: function () {
    this.window = new Gtk.Window ({title: "SC2 Browser"});
    this.window.connect ("hide", Gtk.main_quit);

    this.scrolled_window = new Gtk.ScrolledWindow ();
    this.window.add (this.scrolled_window);

    var main_box = new Gtk.Box ({orientation: Gtk.Orientation.VERTICAL, spacing: 0});
    this.scrolled_window.add (main_box);

    // Initialize our browser.
    this.browser = new WebKit.WebView ();
    this.browser.load_uri('http://www.slashdot.org');
    main_box.pack_start (this.browser, true, true, 0);
    
    // Add a 'stats' button.  When clicking this button, it will take
    // you to sc2ranks.com.
    var stats_button = new Gtk.Button ({label: "Stats"});
    stats_button.connect ("clicked", Lang.bind (this, this._statsClicked));
    main_box.pack_start (stats_button, false, false, 0);
    
    this.window.show_all ();
  },
  
  _statsClicked: function() {
    this.browser.load_uri('http://www.sc2ranks.com');
  }
}

Gtk.init (0, null);
var b = new SC2Browser ();
Gtk.main ();
