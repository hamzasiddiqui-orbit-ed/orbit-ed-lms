// 1.
export const speechRate = {
  description:
    "The pace at which you converse with your audience has a significant impact on how well you communicate your message. Therefore, it's crucial to comprehend your speaking rate, which is the number of words spoken per minute.",
  tip: {
    heading: "Reduce your speaking pace",
    description: "Speak a bit louder; it naturally slows your pace since it's hard to talk loudly and quickly at the same time. Volume is a public speaking asset—use it to reduce your speaking speed."
  }
};

// 2.
export const pauses = {
  description:
    "When speaking, a pause is a brief period of silence. This is not a pointless interval.   By pausing, you offer your listeners a chance to consider what you just stated. If utilised properly, pausing may greatly improve your networking and communication skills.",
    tip: {
      heading: "Embrace Pauses",
      description: "Structure your notes with the word 'PAUSE' wherever you need time for a point to resonate. Break down your notes into concise bullets or phrases. This approach will train your mind to view your presentation as a series of distinct expressions—with natural pauses between them—rather than a continuous stream of words to rush through."
    }
};

// 3.
export const fillerSounds = {
  description:
    "It's typical to refer to filler sounds and noises as ‘filled pauses’. These uncommon words stand for anxiety and fragmented concentration. The speakers may come seen as unprepared or incompetent, which damages their credibility.",
    tip: {
      heading: "Eliminate Filler Sounds",
      description: "Don’t worry about how your pauses will be perceived—audiences usually don’t notice brief pauses, as they are just moments of silence. Use them strategically, and practice avoiding filler words like 'ah' or 'um', which can draw attention to the pauses."
    }
};

// 4.
export const repetitiveWords = {
  description:
    "It's typical to refer to repetitive words and noises as ‘filled pauses’. These uncommon words stand for anxiety and fragmented concentration. The speakers may come seen as unprepared or incompetent, which damages their credibility.",
    tip: {
      heading: "Eliminate Repetitive Words",
      description: "Learn and practice synonyms to vary your language. For example, use 'extremely' or 'genuinely' instead of repeatedly saying 'very'."
    }
};

// 5.
export const clarity = {
  description:
    "Speaking inarticulately has major ramifications for both your professional and personal image. Listeners gradually stop paying attention to you when you're hard to understand. Speech clarity refers to the quality of speech transfer to listeners. It takes more than just saying the words to effectively communicate. Making sure the recipient understands the message is important.",
    tip: {
      heading: "Reduce your speaking pace",
      description: "Speak a bit louder; it naturally slows your pace since it's hard to talk loudly and quickly at the same time. Volume is a public speaking asset—use it to reduce your speaking speed."
    }
};

// 6.
export const eyeContact = {
  description:
    "In addition to being a sight organ, Eyes play a major role in communication. It's crucial to maintain eye contact while speaking. It demonstrates interest and attention to what is being discussed. In fact, maintaining meaningful eye contact is typically similar to sharing words during conversation.",
    tip: {
      heading: "Maintain Healthy Eye Contact",
      description: "To maintain natural eye contact, use gestures or nods instead of looking away. Rather than completely breaking eye contact, shift your gaze among different points on the face of your listener, such as the eyes and mouth, in a triangular pattern. Every few seconds, rotate your focus between these points to appear more engaged and confident."
    }
};

// 7.
export const pitch = {
  description:
    "Pitch is the relative highness or lowness of a tone as heard by the ear. In order to properly communicate your ideas, you must avoid monotony and find your vocal variety. The people listening to you can have trouble comprehending your speech if you don't vary the pitch of your voice. If you want to talk effectively, you must learn to regulate your voice, modify your tone, and use pitch variation for better emphasis and understanding.",
    tip: {
      heading: "Speak Loud, but don’t shout!",
      description: "Good posture improves voice projection and airflow. Avoid speaking loudly for long periods to prevent vocal strain. Drink plenty of water to keep your vocal cords lubricated."
    }
};

// 8.
export const loudness = {
  description:
    "Loudness of voice in communication refers to the volume or intensity of the speaker's voice during verbal interaction. It is a key paralinguistic feature that can convey various emotions, attitudes, and intentions. Loudness can affect how a message is perceived by the listener, influencing the communication's effectiveness.",
    tip: {
      heading: "Speak Loud, but don’t shout!",
      description: "Good posture improves voice projection and airflow. Avoid speaking loudly for long periods to prevent vocal strain. Drink plenty of water to keep your vocal cords lubricated."
    }
};

// EYE CONTACT, CLARITY, CONTEXT TO BE ADDED LATER


// export const baseParametersInfo = {
//   //  1.
//   speech_rate: {
//     title: "Speech Rate",
//     description: "The rate at which words are spoken.",
//     benchmarkGradient: "linear-gradient(90deg, #F4470E 0% 20%, #FFA500 20% 30%, #8BCB7B 30% 70%, #FFA500 70% 80%, #F4470E 80% 100%)",
//     statsGradient: "linear-gradient(90deg, #0B2176 0% 20%, #4B6BFD 20% 30%, #93A4E0 30% 70%, #4B6BFD 70% 80%, #0B2176 80% 100%)",
//     benchmarks: [
//       { position: 25, label: "100 WPM" },
//       { position: 75, label: "190 WPM" }
//     ],
//     benchmarkLabels: ["Bad", "Good", "Bad"],
//     min: 55,
//     max: 245,
//     unit: "WPM",
//     ranges: [
//       { min: 110, max: 190, label: "Excellent" },
//       { min: 100, max: 200, label: "Good" },
//       { min: 85, max: 215, label: "Average" },
//       { min: 55, max: 245, label: "Bad" }
//     ]
//   },

//   // 2.
//   repetitive_words: {
//     title: "Repetitive Words",
//     description: "The frequency of repeated words in speech.",
//     benchmarkGradient: "linear-gradient(90deg, #8BCB7B 0% 70%, #FFA500 70% 80%, #F4470E 80% 100%)",
//     statsGradient: "linear-gradient(90deg, #93A4E0 0% 70%, #4B6BFD 70% 80%, #0B2176 80% 100%)",
//     benchmarks: [
//       { position: 70, label: "2.8%" },
//       { position: 80, label: "3.4%" }
//     ],
//     benchmarkLabels: ["Excellent", "Good", "Bad"],
//     min: 0,
//     max: 5,
//     unit: "%",
//     ranges: [
//       { min: 0, max: 2.8, label: "Excellent" },
//       { min: 2.8, max: 3.4, label: "Good" },
//       { min: 3.4, max: 4.0, label: "Average" },
//       { min: 4.0, max: 100, label: "Bad" }
//     ]
//   },

//   // 3.
//   filler_sounds: {
//     title: "Filler Sounds",
//     description: "The frequency of filler sounds in speech.",
//     benchmarkGradient: "linear-gradient(90deg, #8BCB7B 0% 70%, #FFA500 70% 80%, #F4470E 80% 100%)",
//     statsGradient: "linear-gradient(90deg, #93A4E0 0% 70%, #4B6BFD 70% 80%, #0B2176 80% 100%)",
//     benchmarks: [
//       { position: 70, label: "2.8%" },
//       { position: 80, label: "3.4%" }
//     ],
//     benchmarkLabels: ["Excellent", "Good", "Bad"],
//     min: 0,
//     max: 5,
//     unit: "%",
//     ranges: [
//       { min: 0, max: 2.8, label: "Excellent" },
//       { min: 2.8, max: 3.4, label: "Good" },
//       { min: 3.4, max: 4.0, label: "Average" },
//       { min: 4.0, max: 100, label: "Bad" }
//     ]
//   },

//   // 4.
//   loudness: {
//     title: "Loudness",
//     description: "The volume level of speech.",
//     benchmarkGradient: "linear-gradient(90deg, #F4470E 0% 15%, #FFA500 15% 20%, #8BCB7B 20% 80%, #FFA500 80% 85%, #F4470E 85% 100%)",
//     statsGradient: "linear-gradient(90deg, #0B2176 0% 15%, #4B6BFD 15% 20%, #93A4E0 20% 80%, #4B6BFD 80% 85%, #0B2176 85% 100%)",
//     benchmarks: [
//       { position: 20, label: "53 dB" },
//       { position: 80, label: "66 dB" }
//     ],
//     benchmarkLabels: ["Bad", "Good", "Bad"],
//     min: 45,
//     max: 75,
//     unit: "dB",
//     ranges: [
//       { min: 53, max: 66, label: "Excellent" },
//       { min: 51.5, max: 68.2, label: "Good" },
//       { min: 51, max: 68.7, label: "Average" },
//       { min: 45, max: 75, label: "Bad" }
//     ]
//   },

//   // 5.
//   pauses: {
//     title: "Pauses",
//     description: "The frequency and duration of pauses in speech.",
//     benchmarkGradient: "linear-gradient(90deg, #8BCB7B 0% 85%, #FFA500 85% 90%, #F4470E 90% 100%)",
//     statsGradient: "linear-gradient(90deg, #93A4E0 0% 85%, #4B6BFD 85% 90%, #0B2176 90% 100%)",
//     benchmarks: [
//       { position: 85, label: "3" },
//       { position: 90, label: "4" }
//     ],
//     benchmarkLabels: ["Excellent", "Good", "Bad"],
//     min: 0,
//     max: 10,
//     unit: "pauses",
//     ranges: [
//       { min: 0, max: 3, label: "Excellent" },
//       { min: 3, max: 4, label: "Good" },
//       { min: 4, max: 5, label: "Average" },
//       { min: 5, max: 100, label: "Bad" }
//     ]
//   },

//   // 6.
//   pitch: {
//     title: "Pitch",
//     description: "The variation in voice pitch during speech.",
//     benchmarkGradient: "linear-gradient(90deg, #F4470E 0% 15%, #FFA500 15% 20%, #8BCB7B 20% 80%, #FFA500 80% 85%, #F4470E 85% 100%)",
//     statsGradient: "linear-gradient(90deg, #0B2176 0% 15%, #4B6BFD 15% 20%, #93A4E0 20% 80%, #4B6BFD 80% 85%, #0B2176 85% 100%)",
//     benchmarks: [
//       { position: 20, label: "0.20 PVQ" },
//       { position: 80, label: "0.25 PVQ" }
//     ],
//     benchmarkLabels: ["Bad", "Good", "Bad"],
//     min: 0,
//     max: 0.35,
//     unit: "PVQ",
//     ranges: [
//       { min: 0.20, max: 0.25, label: "Excellent" },
//       { min: 0.16, max: 0.27, label: "Good" },
//       { min: 0.14, max: 0.28, label: "Average" },
//       { min: 0, max: 0.35, label: "Bad" }
//     ]
//   }
// };