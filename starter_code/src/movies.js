// Get the average of all rates with 2 decimals
const ratesAverage = function(arr) {

	let rates = arr.map(function(movie) {
		if (!movie.rate) return 0;
		return movie.rate;
	});
	let result = rates.reduce(function(accumulator, currentValue) {
		return accumulator + parseFloat(currentValue);
	}, 0)

	const avg = parseFloat((result / arr.length).toFixed(2))

	return avg;
};
// console.log(ratesAverage(movies));


// Get the average of Drama Movies
const dramaMoviesRate = function(arr) {
	let dramaMovies = arr.filter(function(movie) {
		return movie.genre.includes("Drama");
	});

	if (!dramaMovies.length) return 0;

	let result = ratesAverage(dramaMovies);

	return result;
};

// console.log(dramaMoviesRate(movies));

// Order by time duration, ascending
// First attempt
// const orderByDuration = function(arr) {
// 	let sortedDuration = arr.sort(function(movie1, movie2) {
// 		if (movie1.duration > movie2.duration) {
// 			return 1;
// 		} else {
// 			return -1;
// 		}
// 	});
// 	return sortedDuration;
// };
// Final attempt, shorter
const orderByDuration = function(arr) {
	let sortDuration = arr.sort((movie1, movie2) =>
		movie1.duration > movie2.duration ? 1 : -1
	);
	return sortDuration;
};

// How many movies did Steven Spielberg direct

const howManyMovies = function(arr) {
	let spielbergMovies = arr.filter(
		movie => movie.director === "Steven Spielberg"
	);
	let spielbergDramaMovies = spielbergMovies.filter(movie =>
		movie.genre.includes("Drama")
	);
	if (!spielbergMovies.length) return 0;
	if (!spielbergDramaMovies.length) return 0;

	return spielbergMovies.length, spielbergDramaMovies.length;
};

// Answer from class. Above is mine from weekend
// function howManyMovies(arr) {
//   const filtered = arr.filter(function(movie) {
//     return (
// 			movie.genre.includes("Drama") && 
// 			movie.director === "Steven Spielberg"
//     );
//   });

//   return filtered.length;
// }
// console.log(howManyMovies(movies));

// Order by title and print the first 20 titles

const orderAlphabetically = function(arr) {
	let movieTitle = arr.map(function(movie) {
		return movie.title;
	});

	let moviesOrder = movieTitle.sort();

	let movieOrder20 = moviesOrder.slice(0, 20);

	return movieOrder20;
};

// Below taken up in class. Above is my solution
// function orderAlphabetically(movies) {
// 	const movieTitles = movies.map(function(movie) {
// 			return movie.title
// 	})
// 	return movieTitles.sort(function(a, b) {
// 			return a.localeCompare(b)
// 	}).slice(0,20)
// }

// console.log(orderAlphabetically(movies))

// Turn duration of the movies from hours to minutes

const turnHoursToMinutes = function(arr) {
	// create array of durations
	let newArr = arr.map(function(movie){
		let movieDur = movie.duration
		let movieDurSplit = movieDur.split(" ")
		let formatedDur = parseInt(movieDurSplit[0])*60 + parseInt(movieDurSplit[1])
		let newObj = Object.assign({}, movie)
		newObj.duration = formatedDur
		return newObj;
	})
	return newArr;
};


// Above is my solution. Below was taken up in class.

// 	function convertHours(duration) {
// 		const hm = duration.split('h');
		
// 		if(hm.length <  2) {
// 			return parseInt(duration)
// 		}
		
// 		const hours = parseInt(hm[0])
// 		const minutes = parseInt(hm[1]) || 0;

// 		const durationInMins = hours * 60 + minutes;
// 		return durationInMins;

// } 

// function turnHoursToMinutes(movies) {
//   const newMovies = movies.map(function(movie) {
//     // const newMovie = Object.assign({}, movie)
//     const newMovie = {
//       title: movie.title,
//       year: movie.year,
//       director: movie.director,
//       genre: movie.genre,
//       rate: movie.rate,
//       duration: movie.duration
//     };

//     newMovie.duration = convertHours(movie.duration);

//     return newMovie;
//   });

//   return newMovies;
// }

	// let formatedArr = arr.map(function(y){
	// 	return Object.assign()
	// })

console.log(turnHoursToMinutes(movies));

// Best yearly rate average
// Below was taken up in class. Did not complete on my own

function bestYearAvg(movies) {
  // create an array with all singular year values
  const years = movies.reduce(function(accumulator, value) {
    if (!accumulator.includes(value.year)) accumulator.push(value.year);
    return accumulator;
  }, []);

  // sort the array of years with a comparison function that compares the average
  years.sort(function(a, b) {
    //   b: 1974
    const bMovies = movies.filter(function(movie) {
      return movie.year === b;
    });
    const aMovies = movies.filter(function(movie) {
      return movie.year === a;
    });

    const aAverage = ratesAverage(aMovies);
    const bAverage = ratesAverage(bMovies);

    if (bAverage === aAverage) {
      return Number(a) - Number(b);
    }

    return bAverage - aAverage;
  });

  const bestYear = years[0];

  if (!bestYear) return null;

  const bestYearMovies = movies.filter(function(movie) {
    return movie.year === bestYear;
  });

  return `The best year was ${bestYear} with an average rate of ${ratesAverage(
    bestYearMovies
  )}`;
}


