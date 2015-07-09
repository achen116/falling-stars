#!/usr/bin/env rake
# Add your own tasks in files placed in lib/tasks ending in .rake,
# for example lib/tasks/capistrano.rake, and they will automatically be available to Rake.

task :default do
  exec('rake -T')
end

desc "Deploy the current version of the game"
task :deploy do
  command = 'git subtree push --prefix public origin gh-pages'
  puts command
  system(command)
end

