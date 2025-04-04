"""
TESTS is a dict with all of your tests.
Keys for this will be the categories' names.
Each test is a dict with
    "input" -- input data for a user function
    "answer" -- your right answer
    "explanation" -- not necessarily a key, it's used for an additional info in animation.
"""
from random import randint


def follow_ghost_legs(n: int, legs: list[tuple[int, int]]) -> list[int]:
    result = [i for i in range(1, n + 1)]
    for a, b in legs:
        result[a - 1], result[b - 1] = result[b - 1], result[a - 1]
    return result


def make_random_tests(*ns):
    for n in ns:
        legs = []
        for _ in range(randint(3, 10)):
            s = randint(1, n - 1)
            legs.append((s, s + 1))
        yield {'input': [n, legs],
               'answer': follow_ghost_legs(n, legs)}


TESTS = {
    "Basics": [
        {
            "input": [3, [(1, 2), (2, 3), (1, 2)]],
            "answer": [3, 2, 1],
        },
        {
            "input": [4, [(2, 3), (1, 2), (2, 3), (3, 4)]],
            "answer": [3, 2, 4, 1],
        },
        {
            "input": [5, [(3, 4), (4, 5), (3, 4), (2, 3), (3, 4)]],
            "answer": [1, 5, 4, 2, 3],
        },
        {
            "input": [6, [(1, 2), (2, 3), (3, 4), (4, 5), (5, 6)]],
            "answer": [2, 3, 4, 5, 6, 1],
        },
    ],
    "Randoms": list(make_random_tests(3, 4, 5, 6, 7, 8, 9, 10)),
}
