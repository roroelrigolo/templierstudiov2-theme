<?php 

add_action('admin_menu', 'base_register_settings_page');

function base_register_settings_page() {
    add_menu_page(
        'Paramètres du thème',
        'Paramètres du thème',
        'manage_options',
        'theme-settings',
        'render_settings_page',
        'dashicons-admin-generic',
        80
    );
}

add_action('admin_init', 'base_register_settings');

function base_register_settings() {
    register_setting('base_settings_group', 'base_disable_core_blocks');
}

function render_settings_page() {
    ?>
    <div class="wrap">
        <h1>Paramètres du thème</h1>
        <form method="post" action="options.php">
            <?php
            settings_fields('base_settings_group');
            do_settings_sections('base_settings_group');
            $disabled = get_option('base_disable_core_blocks');
            ?>
            <table class="form-table">
                <tr valign="top">
                    <th scope="row">Désactiver les blocs Gutenberg par défaut</th>
                    <td>
                        <input type="checkbox" name="base_disable_core_blocks" value="1" <?php checked(1, $disabled, true); ?> />
                        <label for="base_disable_core_blocks">Activer cette option pour supprimer les blocs par défaut de Gutenberg.</label>
                    </td>
                </tr>
            </table>
            <?php submit_button(); ?>
        </form>
    </div>
    <?php
}