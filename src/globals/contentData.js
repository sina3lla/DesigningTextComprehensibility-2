export const demoPassage = {
  id: 'water_cycle_1',
  concept: 'The Water Cycle',
  semanticUnits: [
    {
      id: 'u1',
      baseMeaning: 'Sunlight warms water, causing it to evaporate.',
      variants: {
        beginner: 'Warm sunlight shines on rivers, lakes, and soil. The water rises into the air.',
        intermediate: 'Warm sunlight lifts water from rivers, lakes, and soil into the air.',
        advanced: 'Solar energy drives evaporation from rivers, lakes, and soil into the air.',
      },
      flaggedTerms: ['sunlight', 'evaporate', 'water'],
      wordDefs: {
        sunlight: { meaning: 'Light and heat from the sun', related: ['water', 'warm'] },
        evaporate: { meaning: 'When liquid water turns into invisible vapor and rises', related: ['water', 'air'] },
        water: { meaning: 'A clear liquid that plants and animals need to live', related: [] },
      },
    },
    {
      id: 'u2',
      baseMeaning: 'The water vapor rises and cools as it goes higher in the atmosphere.',
      variants: {
        beginner: 'The water vapor goes up and gets cooler as it rises high in the air.',
        intermediate: 'Water vapor rises high into the atmosphere and gradually cools.',
        advanced: 'Ascending water vapor cools in the upper atmosphere through adiabatic expansion.',
      },
      flaggedTerms: ['vapor', 'rises', 'cools', 'atmosphere'],
      wordDefs: {
        vapor: { meaning: 'Water that has turned into an invisible gas', related: ['water', 'air', 'rises'] },
        atmosphere: { meaning: 'All the air surrounding Earth', related: ['air', 'sky'] },
      },
    },
    {
      id: 'u3',
      baseMeaning: 'As the vapor cools, it condenses into tiny water droplets.',
      variants: {
        beginner: 'When the water vapor gets cold enough, it turns into tiny drops of water.',
        intermediate: 'The cooling vapor condenses into microscopic water droplets.',
        advanced: 'Vapor undergoes condensation, transitioning to liquid water droplets.',
      },
      flaggedTerms: ['condenses', 'droplets', 'cooling'],
      wordDefs: {
        condenses: { meaning: 'When a gas turns into a liquid, usually because it gets cold', related: ['vapor', 'drops'] },
        droplets: { meaning: 'Tiny drops of liquid water', related: ['water', 'clouds'] },
      },
    },
    {
      id: 'u4',
      baseMeaning: 'Millions of these droplets gather together to form clouds.',
      variants: {
        beginner: 'Millions of tiny drops stick together and make clouds in the sky.',
        intermediate: 'Billions of these tiny droplets collect together to form visible clouds.',
        advanced: 'Aggregated water droplets form visible cloud formations across the troposphere.',
      },
      flaggedTerms: ['droplets', 'gather', 'clouds'],
      wordDefs: {
        clouds: { meaning: 'A visible mass of water droplets floating in the air', related: ['water', 'sky', 'droplets'] },
      },
    },
    {
      id: 'u5',
      baseMeaning: 'When droplets become too heavy, they fall as rain or snow.',
      variants: {
        beginner: 'When the water drops get too heavy, they fall back to Earth as rain or snow.',
        intermediate: 'When droplets accumulate and become too heavy to float, they fall as precipitation.',
        advanced: 'Coalescence increases droplet mass until gravitational forces induce precipitation.',
      },
      flaggedTerms: ['droplets', 'heavy', 'precipitation', 'rain'],
      wordDefs: {
        precipitation: { meaning: 'Water that falls from clouds, like rain, snow, or sleet', related: ['rain', 'clouds'] },
        rain: { meaning: 'Water falling from clouds in liquid form', related: ['water', 'droplets'] },
      },
    },
    {
      id: 'u6',
      baseMeaning: 'The water returns to rivers, lakes, and soil, and the cycle continues.',
      variants: {
        beginner: 'The water flows back into rivers and lakes, or soaks into the ground. Then it all starts again.',
        intermediate: 'Water returns to rivers, lakes, and soil, where the cycle begins anew.',
        advanced: 'Returned water percolates into soil aquifers or flows to reservoirs, enabling cyclical continuation.',
      },
      flaggedTerms: ['cycle', 'returns'],
      wordDefs: {
        cycle: { meaning: 'A process that repeats again and again', related: ['continues', 'water'] },
      },
    },
  ],
};

export const definitions = {
  sunlight: { word: 'sunlight', meaning: 'Light and heat from the sun', example: 'Sunlight warms the water.' },
  evaporate: { word: 'evaporate', meaning: 'To turn from liquid into vapor; to rise into the air', example: 'Water evaporates on warm days.' },
  water: { word: 'water', meaning: 'A clear liquid found in oceans, rivers, and lakes', example: 'We drink water every day.' },
  vapor: { word: 'vapor', meaning: 'Water in the form of an invisible gas in the air', example: 'Steam is water vapor.' },
  atmosphere: { word: 'atmosphere', meaning: 'All the air that surrounds Earth', example: 'Clouds float in the atmosphere.' },
  condense: { word: 'condense', meaning: 'To change from a gas into a liquid', example: 'Water vapor condenses on cold surfaces.' },
  droplets: { word: 'droplets', meaning: 'Very small drops of liquid', example: 'Clouds are made of tiny water droplets.' },
  clouds: { word: 'clouds', meaning: 'Visible masses of water droplets floating in the sky', example: 'Dark clouds bring rain.' },
  precipitation: { word: 'precipitation', meaning: 'Water that falls from clouds as rain, snow, or sleet', example: 'We got two inches of precipitation last week.' },
  rain: { word: 'rain', meaning: 'Water falling from clouds in liquid form', example: 'The rain watered the plants.' },
  cycle: { word: 'cycle', meaning: 'A series of events that repeat over and over', example: 'The water cycle never stops.' },
  gravity: { word: 'gravity', meaning: 'The force that pulls things down toward Earth', example: 'Gravity pulls raindrops to the ground.' },
};
