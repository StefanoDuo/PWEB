/* The Movement object receives the input behaviours from the Keybind
 * object and returns 3 components Vector where the first 2 components
 * are the movement versor, the third the points awarded for the move
 * (initially +1 for normal moving and redo, -1 for redo)
 *
 * It keeps an history of the moves to be able to give meaning to the
 * redo and undo commands
 */