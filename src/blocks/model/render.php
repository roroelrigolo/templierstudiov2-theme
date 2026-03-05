<?php

function render_model_block($attributes) {
    if (empty($attributes['selectedModel'])) {
        return '<p>Aucun modèle sélectionné.</p>';
    }

    $post_id = intval($attributes['selectedModel']);
    $post = get_post($post_id);

    if (!$post) {
        return '<p>Modèle introuvable.</p>';
    }

    return apply_filters('the_content', $post->post_content);
}

?>