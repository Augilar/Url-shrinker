# url-shrinker
***
Shrinks large urls into small ones using nodejs, mongodb and express framework.

Working :

1. whenever someone enters a url it creates an entry into the database.
2. And then creates a 6 char hash for the given url and save it into that entry
3. now whenever a get request is sent to this website with the hash in its url, it will check all the entries in the database with the same hash and redirect it to the original function.
