// Signup Form.
(function() {

        // Vars.
        var $form = $('#signup-form'),
                $submit = $('#signup-form input[type="submit"]'),
                $message;

        // // Bail if addEventListener isn't supported.
        // if (!('addEventListener' in $form))
        //         return;

        // Message.
        $message = document.createElement('span');
        $message.classList.add('message');
        $form.append($message);

        $message._show = function(type, text) {

                $message.innerHTML = text;
                $message.classList.add(type);
                $message.classList.add('visible');

                window.setTimeout(function() {
                        $message._hide();
                }, 3000);

        };

        $message._hide = function() {
                $message.classList.remove('visible');
        };

        // Events.
        // Note: If you're *not* using AJAX, get rid of this event listener.
        $(document).ready(function () {
            $("#signup-form").on('submit', function(event) {
                    event.stopPropagation();
                    event.preventDefault();

                    // Hide message.
                    $message._hide();

                    // Disable submit.
                    $submit.disabled = true;


                    // Process Form.
                    var output;
                    $.ajax({
                            type: 'POST',
                            url: "cgi-bin/save.py",
                            data: {
                                    param: document.getElementById('email').value
                            }, //passing some input here
                            dataType: "text",
                            success: function(response) {
                                    window.setTimeout(function() {

                                            // Reset form.
                                            $form.reset();

                                            // Enable submit.
                                            $submit.disabled = false;

                                            // Show message.
                                            $message._show('success', 'Thank you!');
                                            //$message._show('failure', 'Something went wrong. Please try again.');

                                    }, 750);

                            }

                    }).done(function(data) {
                            console.log(data);
                    });

                    return false;
            });
        });

})();
