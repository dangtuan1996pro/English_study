# Be sure to restart your server when you modify this file.

# Version of your assets, change this if you want to expire all your assets.
Rails.application.config.assets.version = '1.0'

# Add additional assets to the asset load path.
# Rails.application.config.assets.paths << Emoji.images_path
# Add Yarn node_modules folder to the asset load path.
Rails.application.config.assets.paths << Rails.root.join('node_modules')

# Precompile additional assets.
# application.js, application.css, and all non-JS/CSS in the app/assets
# folder are already added.
# Rails.application.config.assets.precompile += %w( admin.js admin.css )
Rails.application.config.assets.precompile += %w( admin.js ckeditor/* )
Rails.application.config.assets.precompile += %w( user_application.css )
Rails.application.config.assets.precompile += %w( user_application.js )
Rails.application.config.assets.precompile += %w( user.js )
Rails.application.config.assets.precompile += %w( user/custom.js )
Rails.application.config.assets.precompile += %w( user/courses.js )
Rails.application.config.assets.precompile += %w( user/main_styles.css )
Rails.application.config.assets.precompile += %w( user/responsive.css )
Rails.application.config.assets.precompile += %w( user/courses.css )
Rails.application.config.assets.precompile += %w( user/courses_responsive.css )
Rails.application.config.assets.precompile += %w( user/course.css )
Rails.application.config.assets.precompile += %w( user/course_responsive.css )
Rails.application.config.assets.precompile += %w( user/plugins/parallax-js-master/parallax.min.js )
Rails.application.config.assets.precompile += %w( user/plugins/progressbar/progressbar.min.js )
Rails.application.config.assets.precompile += %w( user/course.js )
Rails.application.config.assets.precompile += %w( picture_upload.js )
Rails.application.config.assets.precompile += %w( table_detail.js )
