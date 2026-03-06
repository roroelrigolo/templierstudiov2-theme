<?php

require_once get_template_directory() . '/src/blocks/posts/render.php';
require_once get_template_directory() . '/src/blocks/model/render.php';

require_once get_template_directory() . '/admin/settings-page.php';

function theme_enqueue_styles()
{
    wp_enqueue_style('parent-style', get_template_directory_uri() . '/style.css');

    wp_enqueue_style('setup-style', get_template_directory_uri() . '/assets/css/setup.css');
    wp_enqueue_style('animation-style', get_template_directory_uri() . '/assets/css/animation.css');
    wp_enqueue_style('custom-style', get_template_directory_uri() . '/assets/css/custom.css');
    wp_enqueue_style('slick-style', get_template_directory_uri() . '/assets/css/slick.css');
    wp_enqueue_style('button-style', get_template_directory_uri() . '/assets/css/button.css');
    wp_enqueue_style('text-style', get_template_directory_uri() . '/assets/css/text.css');
    wp_enqueue_style('scroll-top-style', get_template_directory_uri() . '/assets/css/scroll_top.css');

    wp_enqueue_style('header-style', get_template_directory_uri() . '/assets/css/header.css');
    wp_enqueue_style('footer-style', get_template_directory_uri() . '/assets/css/footer.css');
    wp_enqueue_style('home-style', get_template_directory_uri() . '/assets/css/home.css');
    wp_enqueue_style('page-114-style', get_template_directory_uri() . '/assets/css/page-114.css');

    wp_enqueue_style('bootstrap', 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css');
}

add_action('wp_enqueue_scripts', 'theme_enqueue_styles');

function theme_enqueue_styles_admin()
{
    wp_enqueue_style('admin-style', get_template_directory_uri() . '/assets/css/admin.css');

    wp_enqueue_style('admin-setup-style', get_template_directory_uri() . '/assets/css/setup.css');
    wp_enqueue_style('admin-animation-style', get_template_directory_uri() . '/assets/css/animation.css');
    wp_enqueue_style('admin-custom-style', get_template_directory_uri() . '/assets/css/custom.css');
    wp_enqueue_style('admin-button-style', get_template_directory_uri() . '/assets/css/button.css');
    wp_enqueue_style('admin-text-style', get_template_directory_uri() . '/assets/css/text.css');

    wp_enqueue_style('admin-bootstrap', 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css');
}

add_action('enqueue_block_assets', 'theme_enqueue_styles_admin');

function theme_enqueue_scripts()
{
    wp_enqueue_script('custom-js', get_template_directory_uri() . '/assets/js/custom.js');
    wp_enqueue_script('post-js', get_template_directory_uri() . '/assets/js/post.js');
    wp_enqueue_script('section-js', get_template_directory_uri() . '/assets/js/section.js');
    wp_enqueue_script('header-js', get_template_directory_uri() . '/assets/js/header.js');
}
add_action('wp_enqueue_scripts', 'theme_enqueue_scripts');

function theme_enqueue_scripts_admin()
{
    wp_enqueue_script('fontawesome-kit', 'https://kit.fontawesome.com/8a96a97965.js', [], null, false);

    if (get_option('base_disable_core_blocks')) {
        wp_enqueue_script(
            'editor-blocks-control-script',
            get_template_directory_uri() . '/assets/js/editor-blocks-control.js',
            array('wp-blocks', 'wp-dom-ready', 'wp-edit-post'),
            filemtime(get_template_directory() . '/js/editor-blocks-control.js'),
            true
        );
    }
}
add_action('admin_enqueue_scripts', 'theme_enqueue_scripts_admin');

function my_theme_support()
{
    add_theme_support('editor-styles');
    add_theme_support('align-wide');
    add_theme_support('wp-block-styles');
}
add_action('after_setup_theme', 'my_theme_support');

function getBlocks()
{
    $blocks = ['menu', 'menu-item', 'text', 'list', 'space', 'section', 'button', 'icon', 'image', 'posts', 'accordion', 'model', 'hyperlink'];
    return $blocks;
}

function theme_register_block_assets()
{
    $blocks = getBlocks();
    foreach ($blocks as $block) {
        wp_enqueue_script(
            $block . '-editor-script',
            get_template_directory_uri() . '/build/blocks/' . $block . '/index.js',
            array('wp-blocks', 'wp-editor'),
            filemtime(get_template_directory() . '/build/blocks/' . $block . '/index.js'),
            true
        );
    }
}
add_action('enqueue_block_editor_assets', 'theme_register_block_assets');

function theme_enqueue_block_assets()
{
    $blocks = getBlocks();
    foreach ($blocks as $block) {
        wp_enqueue_style(
            $block . '-style',
            get_template_directory_uri() . '/build/blocks/' . $block . '/style-index.css',
            array(),
            filemtime(get_template_directory() . '/build/blocks/' . $block . '/style-index.css')
        );
    }
}
add_action('wp_enqueue_scripts', 'theme_enqueue_block_assets');

function theme_enqueue_block_assets_admin()
{
    $blocks = getBlocks();
    foreach ($blocks as $block) {
        wp_enqueue_style(
            $block . '-style',
            get_template_directory_uri() . '/build/blocks/' . $block . '/style-index.css',
            array(),
            filemtime(get_template_directory() . '/build/blocks/' . $block . '/style-index.css')
        );
    }
}
add_action('wp_enqueue_scripts', 'theme_enqueue_block_assets_admin');

function theme_enqueue_block_editor_assets()
{
    $blocks = getBlocks();
    foreach ($blocks as $block) {
        wp_enqueue_style(
            $block . '-editor-style',
            get_template_directory_uri() . '/build/blocks/' . $block . '/style-index.css',
            array(),
            filemtime(get_template_directory() . '/build/blocks/' . $block . '/style-index.css')
        );
    }
}
add_action('enqueue_block_editor_assets', 'theme_enqueue_block_editor_assets');

add_theme_support('post-thumbnails');

function mon_theme_setup()
{
    add_theme_support('custom-logo', array(
        'height' => 100,
        'width' => 400,
        'flex-height' => true,
        'flex-width' => true,
    ));
}
add_action('after_setup_theme', 'mon_theme_setup');

function allow_svg_uploads($mimes)
{
    $mimes['svg'] = 'image/svg+xml';
    return $mimes;
}
add_filter('upload_mimes', 'allow_svg_uploads');

register_block_type('templierstudiov2-theme/posts', [
    'render_callback' => 'render_posts_block',
]);

register_block_type('templierstudiov2-theme/model', [
    'render_callback' => 'render_model_block',
]);

function fse_custom_head()
{
    ?>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css"
        integrity="…hash…" crossorigin="anonymous">
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <link rel="stylesheet" type="text/css" href="//cdn.jsdelivr.net/npm/slick-carousel@1.8.1/slick/slick.css" />
    <script type="text/javascript" src="//cdn.jsdelivr.net/npm/slick-carousel@1.8.1/slick/slick.min.js"></script>
    <?php
}
add_action('wp_head', 'fse_custom_head');

// Ajouter le bouton "Scroll to Top" dans le footer
function scroll_to_top()
{
    ?>
    <div class="scroll-to-top" onclick="scrollToTop()">
        <i class="fa-solid fa-arrow-up"></i>
    </div>
    <?php
}
add_action('wp_footer', 'scroll_to_top');

add_action('customize_register', function () { });

/*CUSTOM*/
?>