# Instructions for Completed Challenge
Instructions by Mitchell Hollander

## Run App Locally
1. Pull this repo
2. Run `bundle install`
3. Edit /config/database.yml to your MySQL database specifications
3. Run `rails db:migrate`
4. Run `rails db:seed` you can find preconfigured users with their login credentials in the /db/seed.rb file.
Feel free to add your own users as well.
5. Run `bin/rake start`

Thats it!

## Live Demo
Open [https://sakura-performance-manager.herokuapp.com](https://sakura-performance-manager.herokuapp.com) to view it in the browser.

Test Admin/Manager User credentials:
* **manager@sakura.com**
* **admin**

Test Standard/Employee User credentials:
* **kiana.kaslana@sakura.com**
* **Password1!**

## Tech Used
* React
* Ruby on Rails (Latest)
* MySQL
* Knock (for JWT Auth)