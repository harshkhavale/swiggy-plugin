<?php

/**
 * PHP file to use when rendering the block type on the server to show on the front end.
 *
 * The following variables are exposed to the file:
 *     $attributes (array): The block attributes.
 *     $content (string): The block default content.
 *     $block (WP_Block): The block instance.
 *
 * @see https://github.com/WordPress/gutenberg/blob/trunk/docs/reference-guides/block-api/block-metadata.md#render
 */

$unique_id = wp_unique_id('p-');
$meals = isset($attributes['meals']) ? $attributes['meals'] : [];
$ourContext = array('attributes' => $attributes);
?>

<div
    <?php echo get_block_wrapper_attributes(); ?>
    data-wp-interactive="create-block"
    data-wp-watch="actions.init"
    <?php echo wp_interactivity_data_wp_context($ourContext) ?>
    id="<?php echo esc_attr($unique_id); ?>">
    <div class="search">
        <input type="text" data-wp-on--change="actions.handleInputChange" id="meal-search" placeholder="Search for a meal...">
        <button id="search-btn" data-wp-on--click="actions.loadMeals">Search</button>
    </div>
    <div class="food-menu">
        <div class="food-items">
            <?php if (!empty($attributes['meals'])): ?>
                <?php foreach ($attributes['meals'] as $meal): ?>
                    <div class="food-item">
                        <h3><?php echo esc_html($meal['strMeal']); ?></h3>
                        <img src="<?php echo esc_url($meal['strMealThumb']); ?>" alt="<?php echo esc_attr($meal['strMeal']); ?>" />
                    </div>
                <?php endforeach; ?>
            <?php else: ?>
                <h1><?php esc_html_e('No meals found.', 'your-text-domain'); ?></h1>
            <?php endif; ?>
        </div>
    </div>
</div>
