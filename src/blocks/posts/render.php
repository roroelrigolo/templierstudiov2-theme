<?php

function render_posts_block($attributes)
{
    $type = $attributes['type'] ?? 'post';
    $style = $attributes['style'] ?? 'style1';
    $quantity = $attributes['quantity'] ?? 3;

    $query = new WP_Query([
        'post_type' => $type,
        'posts_per_page' => $quantity,
    ]);

    if (!$query->have_posts()) {
        return '<p>Aucun post trouvé.</p>';
    }

    ob_start();

    //Savoir si on est sur le single ou pas
    global $post;
    $single_id = null;

    if (is_single() && get_post_type() === 'post') {
        $single_id = $post->ID;
    }
    ?>
    <div class="posts-block <?= esc_attr($style) ?>">
        <?php
        if ($style == 'style1') {
            $latest_post = get_posts([
                'post_type' => $type,
                'posts_per_page' => 1,
                'post__not_in' => [$single_id],
            ]);

            $exclude_id = !empty($latest_post) ? $latest_post[0]->ID : 0;

            $query = new WP_Query([
                'post_type' => $type,
                'posts_per_page' => 2,
                'post__not_in' => [$exclude_id, $single_id],
            ]);

            if (!empty($latest_post)) {
                ?>
                <a class="lasted" href="<?= get_permalink($exclude_id) ?>">
                    <?php if (has_post_thumbnail($exclude_id)): ?>
                        <div class="post-thumbnail"> <?= get_the_post_thumbnail($exclude_id, 'large') ?> </div>
                    <?php endif; ?>
                    <div class="content">
                        <h3 class="post-title"> <?= get_the_title($exclude_id) ?> </h3>
                        <p class="post-excerpt"> <?= wp_trim_words($latest_post[0]->post_content, 20, '...') ?> </p>
                        <p class="post-link">Lire la suite</p>
                    </div>
                </a>
                <?php
            }
            ?>
            <div class="other">
                <?php while ($query->have_posts()):
                    $query->the_post();
                    ?>
                    <a href="<?= get_permalink() ?>" class="post-item">
                        <?php if (has_post_thumbnail()): ?>
                            <div class="post-thumbnail"> <?= get_the_post_thumbnail(get_the_ID(), 'large') ?> </div>
                        <?php endif; ?>
                        <div class="content">
                            <div>
                                <h3 class="post-title"> <?= get_the_title() ?> </h3>
                                <p class="post-excerpt"> <?= wp_trim_words(get_the_content(), 15, '...') ?> </p>
                            </div>
                            <p class="post-link">Lire la suite</p>
                        </div>
                    </a>
                <?php endwhile; ?>
            </div>
            <?php
        } elseif ($style == 'style-reviews') {
            while ($query->have_posts()):
                $query->the_post();
                $content = get_field('content');
                $job = get_field('job');
                $picture = get_field('picture');
                ?>
                <div class="content">
                    <?php if (!empty($picture)): ?>
                        <img src="<?= esc_url($picture['url']) ?>" alt="<?= esc_attr($picture['alt']) ?>">
                    <?php endif; ?>
                    <div class="post-review"> <?= $content ?> </div>
                    <div class="post-review-user-content">
                        <p class="post-title"> <?= get_the_title() ?> </p>
                        <p class="post-job"> <?= $job ?> </p>
                    </div>
                </div>
                </a>
            <?php endwhile; ?>
            <?php
        }
        ?>
    </div>
    <?php
    wp_reset_postdata();
    return ob_get_clean();
}

?>