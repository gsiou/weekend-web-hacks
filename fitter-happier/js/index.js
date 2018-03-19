const lyricsText = `Fitter, happier
More productive
Comfortable
Not drinking too much
Regular exercise at the gym, three days a week
Getting on better with your associate employee contemporaries
At ease
Eating well
No more microwave dinners and saturated fats
A patient, better driver
A safer car, baby smiling in back seat
Sleeping well, no bad dreams
No paranoia
Careful to all animals, never washing spiders down the plughole
Keep in contact with old friends
Enjoy a drink now and then
Will frequently check credit at moral bank, hole in wall
Favours for favours, fond but not in love
Charity standing orders on sundays, ring-road supermarket
No killing moths or putting boiling water on the ants
Car wash, also on sundays
No longer afraid of the dark or midday shadows
Nothing so ridiculously teenage and desperate
Nothing so childish
At a better pace, slower and more calculated
No chance of escape
Now self-employed
Concerned, but powerless
An empowered and informed member of societ
Pragmatism not idealism
Will not cry in public
Less chance of illness
Tires that grip in the wet, shot of baby strapped in backseat
A good memory
Still cries at a good film
Still kisses with saliva
No longer empty and frantic
Like a cat
Tied to a stick
That's driven into
Frozen winter shit, the ability to laugh at weakness
Calm, fitter, healthier and more productive
A pig in a cage on antibiotics`

const getRandomInt = (max) => (Math.floor(Math.random() * Math.floor(max)))

const shuffle = (arr) => {
  let result = []
  const array = arr.slice()
  let randomIndex
  while (array.length !== 0) {
    randomIndex = getRandomInt(array.length)
    result.push(array[randomIndex])
    array.splice(randomIndex, 1)
  }
  return result
}

window.onload = () => {
  const sentences = lyricsText.split('\n')
  const numberOfLines = sentences.length
  let lyricsHtml = ''
  const indexes = shuffle([...Array(numberOfLines).keys()])
  const mappedSentences = sentences.map((lyric, index) => {lyricsHtml += `<span id='lyric-${indexes[index]}' class='size${getRandomInt(3)}'>${lyric}.&nbsp</span>`})
  document.getElementById('canvas').innerHTML = lyricsHtml
  let counter = 0
  setInterval(() => {
    document.getElementById(`lyric-${counter}`).classList.add('active')
    document.getElementById('highlight').innerText = document.getElementById(`lyric-${counter}`).innerText
    if (counter !== 0) {
      document.getElementById(`lyric-${counter - 1}`).classList.remove('active')      
    } else {
      document.getElementById(`lyric-${numberOfLines - 1}`).classList.remove('active')      
    }
    if (counter === numberOfLines - 1) {
      counter = 0
    } else {
      counter++
    }
  }, 1500)
}