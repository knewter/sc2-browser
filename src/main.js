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

    var main_box = new Gtk.Box ({orientation: Gtk.Orientation.VERTICAL, spacing: 0});
    this.window.add (main_box);

    main_box.pack_start (this.scrolled_window, true, true, 0);

    // Initialize our browser.
    this.browser = new WebKit.WebView ();
    this.browser.load_uri('http://www.slashdot.org');
    this.scrolled_window.add (this.browser, true, true, 0);

    var button_box = new Gtk.HButtonBox();
    main_box.pack_start(button_box, false, false, 0);
    
    // Add a 'stats' button.  When clicking this button, it will take
    // you to sc2ranks.com.
    var stats_button = new Gtk.Button ({label: "Stats"});
    stats_button.connect ("clicked", Lang.bind (this, this._statsClicked));
    button_box.pack_start (stats_button, true, true, 0);

    // Add a 'casts' button.  When clicking this button, it will take
    // you to sc2casts.com.
    var casts_button = new Gtk.Button ({label: "Casts"});
    casts_button.connect ("clicked", Lang.bind (this, this._castsClicked));
    button_box.pack_start (casts_button, true, true, 0);
    
    this.window.show_all ();
  },
  
  _statsClicked: function() {
    this.browser.load_uri('http://www.sc2ranks.com');
  },

  _castsClicked: function() {
    this.browser.load_uri('http://sc2casts.com');
  }
}

Gtk.init (0, null);
var b = new SC2Browser ();
Gtk.main ();
