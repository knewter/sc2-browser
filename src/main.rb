# Based on http://www.idle-hacking.com/2010/02/webkit-ruby-and-gtk/
$LOAD_PATH.unshift File.join(File.dirname(__FILE__), '..', 'lib')
require 'gir_ffi'

GirFFI.setup :WebKit, '3.0'

Gtk.init

class SC2Browser
  def initialize
    win = Gtk::Window.new :toplevel
    win.set_title("SC2 Browser")

    scrolled_window = Gtk::ScrolledWindow.new(nil, nil)

    main_box = Gtk::Box.new(:vertical, 0)
    win.add(main_box)

    main_box.pack_start(scrolled_window, true, true, 0)

    @browser = WebKit::WebView.new
    @browser.open('http://www.slashdot.org')
    scrolled_window.add(@browser)

    button_box = Gtk::HButtonBox.new
    main_box.pack_start(button_box, false, false, 0)

    button_clicked = lambda{|widget, data|
      puts "Hello again - #{data} was pressed"
      @browser.open(data)
    }

    # Add a 'stats' button.  When clicking this button, it will take
    # you to sc2ranks.com.
    stats_button = Gtk::Button.new_with_label("Stats")
    GObject.signal_connect stats_button, "clicked", "http://sc2ranks.com", &button_clicked
    button_box.pack_start(stats_button, true, true, 0)

    # Add a 'casts' button.  When clicking this button, it will take
    # you to sc2casts.com.
    casts_button = Gtk::Button.new_with_label("Casts")
    GObject.signal_connect casts_button, "clicked", "http://sc2casts.com", &button_clicked
    button_box.pack_start(casts_button, true, true, 0)

    win.show_all
    GObject.signal_connect(win, "destroy") { Gtk.main_quit }
  end
end

b = SC2Browser.new
Gtk.main
