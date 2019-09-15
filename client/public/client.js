$(function() {
    $('form').submit(function(event) {
        event.preventDefault();

        let query = $('input[type="text"]').val();
        let context = $('input[name="context"]:checked').val();

        $.get('/search?' + $.param({context: context, query: query}), function(data) {
            $('input[type="text"]').val();
            $('input').focus();

            document.getElementById('results').innerHTML = data.tracks.items.map(track => {
                return `<li><button id="tester">${track.name} by ${track.artists[0].name}</button> <a href="${track.external_urls.spotify}" target="_blank">Play</a></li>`;
            }).join('\n');
        });
    });


});
