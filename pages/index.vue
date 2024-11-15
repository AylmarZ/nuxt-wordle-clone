<template>
  <div
    class="absolute transition-colors w-dvw h-dvh flex justify-center items-center"
    :style="{
      zIndex: showOverModal ? 50 : -1,
      backgroundColor: showOverModal
        ? 'rgba(0, 0, 0, 0.6)'
        : 'rgba(0, 0, 0, 0)',
    }"
  >
    <div
      class="w-4/5 max-w-96 h-3/5 bg-white rounded flex flex-col justify-center items-center p-2"
      :style="{
        zIndex: showOverModal ? 50 : -1,
        opacity: showOverModal ? 1 : 0,
      }"
    >
      <h2
        class="text-2xl font-semibold border-b border-gray-400 w-4/5 m-2 pb-2 text-center"
      >
        You {{ isLoss ? 'lose' : 'win!' }}
      </h2>
      <span>The word was: {{ currentWord }}</span>
      <button
        class="p-2 px-4 mt-5 text-white rounded bg-correct hover:bg-correct-dark transition-colors"
        @click="restartGame"
        @keydown="(e) => e.preventDefault()"
      >
        Play again
      </button>
    </div>
  </div>
  <div
    class="bg-white w-screen h-dvh flex flex-col justify-center items-center select-none"
  >
    <div
      class="invalid-word-warning bg-red-400 text-white absolute top-3 p-2 rounded transition-opacity duration-500"
      :style="{
        opacity: showWarning ? 1 : 0,
      }"
    >
      {{ errorMessage }}
    </div>
    <div
      class="game my-2 w-3/5 max-w-96 aspect-[5/6] grid grid-rows-6 grid-cols-1 gap-2"
    >
      <div v-for="row in game" class="row grid grid-rows-1 grid-cols-5 gap-2">
        <Letter
          v-for="item in row"
          :key="item.id"
          :key-type="item.keyType"
          :letter="item.letter"
        />
      </div>
    </div>
    <div class="keyboard flex flex-col gap-2 w-3/4 max-w-xl">
      <div
        v-for="row in keyboard"
        class="row grid justify-center gap-2 w-full"
        :style="{
          gridTemplateColumns: `repeat(${row.length}, minmax(0, 1fr))`,
        }"
      >
        <Key
          v-for="key in row"
          :key="key.id"
          :key-type="key.keyType"
          :letter="key.letter"
          class="cursor-pointer"
          @click="handleKeyDown({ key: key.letter })"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
const { data: wordData } = await useFetch(
  'https://raw.githubusercontent.com/tabatkins/wordle-list/main/words',
  {
    onResponse({ response }) {
      return response._data;
    },
  }
);
const { data: canBeCorrectWords } = await useFetch(
  'https://gist.githubusercontent.com/shmookey/b28e342e1b1756c4700f42f17102c2ff/raw/ed4c33a168027aa1e448c579c8383fe20a3a6225/WORDS',
  {
    onResponse({ response }) {
      return response._data;
    },
  }
);
wordData.value = wordData.value.split('\n');
canBeCorrectWords.value = canBeCorrectWords.value.split('\n');

const game = ref([]);
const currentRow = ref(0);
const currentWord = ref(null);
const spelledWords = ref([]);

const showWarning = ref(false);
const errorMessage = ref(null);
const showOverModal = ref(false);
const isLoss = ref(false);

const keyboard = ref([
  [
    { id: 1, letter: 'q', keyType: 'empty-bg' },
    { id: 2, letter: 'w', keyType: 'empty-bg' },
    { id: 3, letter: 'e', keyType: 'empty-bg' },
    { id: 4, letter: 'r', keyType: 'empty-bg' },
    { id: 5, letter: 't', keyType: 'empty-bg' },
    { id: 6, letter: 'y', keyType: 'empty-bg' },
    { id: 7, letter: 'u', keyType: 'empty-bg' },
    { id: 8, letter: 'i', keyType: 'empty-bg' },
    { id: 9, letter: 'o', keyType: 'empty-bg' },
    { id: 10, letter: 'p', keyType: 'empty-bg' },
  ],
  [
    { id: 11, letter: 'a', keyType: 'empty-bg' },
    { id: 12, letter: 's', keyType: 'empty-bg' },
    { id: 13, letter: 'd', keyType: 'empty-bg' },
    { id: 14, letter: 'f', keyType: 'empty-bg' },
    { id: 15, letter: 'g', keyType: 'empty-bg' },
    { id: 16, letter: 'h', keyType: 'empty-bg' },
    { id: 17, letter: 'j', keyType: 'empty-bg' },
    { id: 18, letter: 'k', keyType: 'empty-bg' },
    { id: 19, letter: 'l', keyType: 'empty-bg' },
  ],
  [
    { id: 20, letter: 'Backspace', keyType: 'empty-bg' },
    { id: 21, letter: 'z', keyType: 'empty-bg' },
    { id: 22, letter: 'x', keyType: 'empty-bg' },
    { id: 23, letter: 'c', keyType: 'empty-bg' },
    { id: 24, letter: 'v', keyType: 'empty-bg' },
    { id: 25, letter: 'b', keyType: 'empty-bg' },
    { id: 26, letter: 'n', keyType: 'empty-bg' },
    { id: 27, letter: 'm', keyType: 'empty-bg' },
    { id: 28, letter: 'Enter', keyType: 'empty-bg' },
  ],
]);

const restartGame = () => {
  game.value = [];
  currentRow.value = 0;
  spelledWords.value = [];
  keyboard.value = [
    [
      { id: 1, letter: 'q', keyType: 'empty-bg' },
      { id: 2, letter: 'w', keyType: 'empty-bg' },
      { id: 3, letter: 'e', keyType: 'empty-bg' },
      { id: 4, letter: 'r', keyType: 'empty-bg' },
      { id: 5, letter: 't', keyType: 'empty-bg' },
      { id: 6, letter: 'y', keyType: 'empty-bg' },
      { id: 7, letter: 'u', keyType: 'empty-bg' },
      { id: 8, letter: 'i', keyType: 'empty-bg' },
      { id: 9, letter: 'o', keyType: 'empty-bg' },
      { id: 10, letter: 'p', keyType: 'empty-bg' },
    ],
    [
      { id: 11, letter: 'a', keyType: 'empty-bg' },
      { id: 12, letter: 's', keyType: 'empty-bg' },
      { id: 13, letter: 'd', keyType: 'empty-bg' },
      { id: 14, letter: 'f', keyType: 'empty-bg' },
      { id: 15, letter: 'g', keyType: 'empty-bg' },
      { id: 16, letter: 'h', keyType: 'empty-bg' },
      { id: 17, letter: 'j', keyType: 'empty-bg' },
      { id: 18, letter: 'k', keyType: 'empty-bg' },
      { id: 19, letter: 'l', keyType: 'empty-bg' },
    ],
    [
      { id: 20, letter: 'Backspace', keyType: 'empty-bg' },
      { id: 21, letter: 'z', keyType: 'empty-bg' },
      { id: 22, letter: 'x', keyType: 'empty-bg' },
      { id: 23, letter: 'c', keyType: 'empty-bg' },
      { id: 24, letter: 'v', keyType: 'empty-bg' },
      { id: 25, letter: 'b', keyType: 'empty-bg' },
      { id: 26, letter: 'n', keyType: 'empty-bg' },
      { id: 27, letter: 'm', keyType: 'empty-bg' },
      { id: 28, letter: 'Enter', keyType: 'empty-bg' },
    ],
  ];
  for (let i = 1; i <= 6; i++) {
    const newRow = ref([]);
    for (let j = 1; j <= 5; j++) {
      newRow.value.push({
        id: j,
        letter: '',
        keyType: 'empty',
      });
    }
    game.value.push(newRow.value);
  }
  isLoss.value = false;
  showOverModal.value = false;
  currentWord.value =
    canBeCorrectWords.value[
      Math.floor(Math.random() * canBeCorrectWords.value.length)
    ];
};

const handleKeyDown = (e) => {
  if (currentRow >= 6 || showOverModal.value) return;
  const currentLetterIndex = game.value[currentRow.value].findIndex(
    (item) => item.letter === ''
  );
  const lastLetterIndex = game.value[currentRow.value].findLastIndex(
    (item) => item.letter !== ''
  );

  if (currentLetterIndex === -1 && e.key === 'Enter') {
    const spelledWord = ref('');
    game.value[currentRow.value].forEach((item) => {
      spelledWord.value += item.letter;
    });
    if (!wordData.value.includes(spelledWord.value)) {
      if (!errorMessage.value) {
        errorMessage.value = 'Invalid word. Try again.';
        showWarning.value = true;
        return setTimeout(() => {
          showWarning.value = false;
          setTimeout(() => {
            errorMessage.value = null;
          }, 500);
        }, 1500);
      } else {
        return;
      }
    } else if (spelledWords.value.includes(spelledWord.value)) {
      if (!errorMessage.value) {
        errorMessage.value = 'You already used this word';
        showWarning.value = true;
        return setTimeout(() => {
          showWarning.value = false;
          setTimeout(() => {
            errorMessage.value = null;
          }, 500);
        }, 1500);
      } else {
        return;
      }
    } else {
      spelledWords.value.push(spelledWord.value);
      const currentWordCopy = [...currentWord.value];
      game.value[currentRow.value].forEach((item, index) => {
        const keyId = keyboard.value
          .flat(Infinity)
          .find((key) => key.letter === item.letter).id;
        if (currentWordCopy.includes(item.letter)) {
          if (index === currentWordCopy.indexOf(item.letter)) {
            item.keyType = 'correct';
            keyboard.value.map((row) => {
              row.map((key) => {
                if (key.id === keyId) {
                  key.keyType = 'correct';
                }
                return key;
              });
              return row;
            });
          } else {
            item.keyType = 'present';
            keyboard.value.map((row) => {
              row.map((key) => {
                if (key.id === keyId && key.keyType !== 'correct') {
                  key.keyType = 'present';
                }
                return key;
              });
              return row;
            });
          }
          currentWordCopy[currentWordCopy.indexOf(item.letter)] = null;
        } else {
          item.keyType = 'absent';
          keyboard.value.map((row) => {
            row.map((key) => {
              if (
                key.id === keyId &&
                key.keyType !== 'correct' &&
                key.keyType !== 'present'
              ) {
                key.keyType = 'absent';
              }
              return key;
            });
            return row;
          });
        }
      });
      const wordKeyTypes = ref([]);
      game.value[currentRow.value].forEach((item) => {
        wordKeyTypes.value.push(item.keyType);
      });
      if (
        wordKeyTypes.value.findIndex((keyType) => keyType !== 'correct') === -1
      ) {
        setTimeout(() => {
          showOverModal.value = true;
        }, 500);
      } else {
        currentRow.value++;
        if (currentRow.value === 6) {
          isLoss.value = true;
          setTimeout(() => {
            showOverModal.value = true;
          }, 500);
        }
      }
    }
  }
  if (/[a-z]/i.test(e.key) && e.key.length === 1) {
    game.value[currentRow.value].map((item, index) => {
      if (index === currentLetterIndex) {
        item.letter = e.key.toLowerCase();
        item.keyType = 'empty-bg';
      }
      return item;
    });
  }
  if (e.key === 'Backspace' && lastLetterIndex !== -1) {
    game.value[currentRow.value].map((item, index) => {
      if (index === lastLetterIndex) {
        item.letter = '';
        item.keyType = 'empty';
      }
      return item;
    });
  }
};

onMounted(() => {
  restartGame();
  setTimeout(() => {
    game.value.map((row) => {
      return row.map((item) => ({
        ...item,
        keyType: 'empty',
      }));
    });
  }, 1);

  document.addEventListener('keydown', handleKeyDown);
});
onUnmounted(() => {
  game.value = [];
  currentRow.value = 0;
  document.removeEventListener('keydown', handleKeyDown);
});
</script>
