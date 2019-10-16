# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

# Please disregard my user names as I've been playing waaaaayyyyyy too much Honkai Impact 3 lately
# and kind of got caught up in naming all the test users after characters from that game

# Admin/Manager User
User.create(email: "manager@sakura.com", password_digest: BCrypt::Password.create('admin'), name: "Johnny Appleseed", admin: true, title: "Captain")
# Standard/Employee Users
User.create(email: "yae.sakura@sakura.com", password_digest: BCrypt::Password.create('Password1!'), name: "Yae Sakura", title: "Flame Sakitama")
User.create(email: "kiana.kaslana@sakura.com", password_digest: BCrypt::Password.create('Password1!'), name: "Kiana Kaslana", title: "Valkyrie Ranger")
User.create(email: "seele.vollerei@sakura.com", password_digest: BCrypt::Password.create("Password1!"), name: "Seele Vollerei", title: "Swallowtail Phantasm")
User.create(email: "bronya.zaychik@sakura.com", password_digest: BCrypt::Password.create("Password1!"), name: "Bronya Zaychik", title: "Herrscher of Reason")
User.create(email: "mei.raiden@sakura.com", password_digest: BCrypt::Password.create("Password1!"), name: "Mei Raiden", title: "Lightning Empress")
User.create(email: "liliya.olenyeva@sakura.com", password_digest: BCrypt::Password.create("Password1!"), name: "Liliya Olenyeva", title: "Blueberry Blitz")
User.create(email: "rozaliya.olenyeva@sakura.com", password_digest: BCrypt::Password.create("Password1!"), name: "Rozaliya Olenyeva", title: "Molotov Cherry")
User.create(email: "rita.rossweisse@sakura.com", password_digest: BCrypt::Password.create("Password1!"), name: "Rita Rossweisse", title: "Phantom Iron")
User.create(email: "fu.hua@sakura.com", password_digest: BCrypt::Password.create("Password1!"), name: "Fu Hua", title: "Phoenix")
User.create(email: "kallen.kaslana@sakura.com", password_digest: BCrypt::Password.create("Password1!"), name: "Kallen Kaslana", title: "Sixth Serenade")