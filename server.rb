require 'rubygems'
require 'bundler/setup'
require 'sinatra'

module PhaserGame
  class App < Sinatra::Base
    set :public_folder, File.dirname(__FILE__) + '/public'

    get '/' do
      File.read File.join('public', 'index.html')
    end
  end
end

