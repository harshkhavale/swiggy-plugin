<?php
/**
 * Registers the block using the metadata loaded from the `block.json` file.
 * Behind the scenes, it registers also all assets so they can be enqueued
 * through the block editor in the corresponding context.
 *
 * @see https://developer.wordpress.org/reference/functions/register_block_type/
 */
function create_block_swiggy_plugin_block_init() {
    register_block_type_from_metadata(
        __DIR__ . '/build',
        array(
            'render_callback' => 'swiggy_plugin_render_callback'
        )
    );
}
add_action( 'init', 'create_block_swiggy_plugin_block_init' );

function swiggy_plugin_render_callback( $attributes ) {
    $attributes_json = esc_attr( wp_json_encode( $attributes ) );
    swiggy_plugin_enqueue_frontend_scripts();

    ob_start();
    ?>
    <div class="wp-block-create-block-swiggy-plugin" data-attributes="<?php echo $attributes_json; ?>"></div>
    <?php
    return ob_get_clean();
}

function swiggy_plugin_enqueue_frontend_scripts() {
    wp_register_script(
        'swiggy-plugin-frontend',
        plugins_url( '/build/frontend.js', __FILE__ ), 
        array( 'wp-element' ),
        filemtime( plugin_dir_path( __FILE__ ) . '/build/frontend.js' ),
        true 
    );

    wp_enqueue_script( 'swiggy-plugin-frontend' );
}
