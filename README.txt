
"Movie Monster" is a simple api app for searching the OMDb movie database.  

axios used for api fetching.
bootstrap used for easy css styling.

really simple html with vanilla javascript and some css to render the cards
and toggle the visibility of cards and handle layout (along with default bootstrap stuff).

Searching for movies will fetch all movies (video games are also in the db for
some reason) related to your search (max ten). As they are rendered, I slap 
the imdbID onto the poster for later use fetching movie details.

The poster is the only clickable area of the search result cards.  This is forced,
as that is the only place you can get the id for a second search on the movie details.
When the user clicks the poster, the initial array of movie search results is toggled
to not be displayed, and the details are toggled to be displayed.  This is reversed 
when the user clicks anywhere on the details card. (id is not needed to exit back to
results page)

* I included a cheesy king kong poster image for the case that the movie data does not
include a poster.
