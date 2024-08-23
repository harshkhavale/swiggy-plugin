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
?>

<div
    <?php echo get_block_wrapper_attributes(); ?>
    data-wp-interactive="create-block"
    id="<?php echo esc_attr($unique_id); ?>" 
>
    <div class="food-menu">
        <div class="food-items">
            <?php if (!empty($meals)): ?>
                <?php foreach ($meals as $meal): ?>
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
