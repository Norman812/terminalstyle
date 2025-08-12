import { test } from 'uvu';
import * as assert from 'uvu/assert';
import { ANSI, CODES } from './utils';
import * as terminalstyle from '../colors.mjs';

test('terminalstyle', () => {
	assert.type(terminalstyle, 'object', 'exports an object');
	assert.type(terminalstyle.$, 'object', 'exports a "$" object');
	assert.is(terminalstyle.$.enabled, true, '~> colors enabled by default');
});

test('codes', () => {
	let k, tmp, val;
	for (k in CODES) {
		tmp = CODES[k];
		val = terminalstyle[k]('~foobar~');
		assert.type(terminalstyle[k], 'function', `is a function`);
		assert.is(terminalstyle[k](), undefined, '~> returns immediately');
		assert.type(val, 'string', 'returns a string value');
		assert.is(val, ANSI(tmp[0]) + '~foobar~' + ANSI(tmp[1]), '~> matches expected');
	}
});

test('wrappings', () => {
	let { yellow, red, bold, cyan, bgRed, dim, italic, underline } = CODES;

	assert.is(
		terminalstyle.red(terminalstyle.bold('~foo~')), //~> terminalstyle.red().bold(val)
		ANSI(red[0]) + ANSI(bold[0]) + '~foo~' + ANSI(bold[1]) + ANSI(red[1])
	);

	assert.is(
		terminalstyle.bold(terminalstyle.yellow(terminalstyle.bgRed(terminalstyle.italic('~foo~')))), //~> terminalstyle.bold().yellow().bgRed().italic(val)
		ANSI(bold[0]) + ANSI(yellow[0]) + ANSI(bgRed[0]) + ANSI(italic[0]) + '~foo~' + ANSI(italic[1]) + ANSI(bgRed[1]) + ANSI(yellow[1]) + ANSI(bold[1])
	);

	assert.is(
		terminalstyle.cyan(terminalstyle.bold(terminalstyle.underline('~foo~'))), //~> terminalstyle.cyan().bold().underline('~foo~')
		ANSI(cyan[0]) + ANSI(bold[0]) + ANSI(underline[0]) + '~foo~' + ANSI(underline[1]) + ANSI(bold[1]) + ANSI(cyan[1])
	);

	assert.is(
		terminalstyle.red(`foo ${terminalstyle.yellow('bar')} baz`),
		ANSI(red[0]) + 'foo ' + ANSI(yellow[0]) + 'bar' + ANSI(yellow[1]) + ANSI(red[0]) + ' baz' + ANSI(red[1])
	);

	assert.is(
		terminalstyle.bold(`foo ${terminalstyle.red(terminalstyle.dim('bar'))} baz`),
		ANSI(bold[0]) + 'foo ' + ANSI(red[0]) + ANSI(dim[0]) + 'bar' + ANSI(dim[1]) + ANSI(bold[0]) + ANSI(red[1]) + ' baz' + ANSI(bold[1])
	);

	assert.is(
		terminalstyle.yellow(`foo ${terminalstyle.red(terminalstyle.bold('red'))} bar ${terminalstyle.cyan('cyan')} baz`),
		ANSI(yellow[0]) + 'foo ' + ANSI(red[0]) + ANSI(bold[0]) + 'red' + ANSI(bold[1]) + ANSI(red[1]) + ANSI(yellow[0]) + ' bar ' + ANSI(cyan[0]) + 'cyan' + ANSI(cyan[1]) + ANSI(yellow[0]) + ' baz' + ANSI(yellow[1])
	);
});

test('integer', () => {
	let { red, blue, italic } = CODES;

	assert.is(
		terminalstyle.blue(-1),
		ANSI(blue[0]) + '-1' + ANSI(blue[1]),
		'~> negative'
	);

	assert.is(
		terminalstyle.blue(123),
		ANSI(blue[0]) + '123' + ANSI(blue[1]),
		'~> positive'
	);

	assert.is(
		terminalstyle.blue(0),
		ANSI(blue[0]) + '0' + ANSI(blue[1]),
		'~> zero'
	);

	assert.is(
		terminalstyle.red(terminalstyle.italic(0)), //~> terminalstyle.red().italic(0)
		ANSI(red[0]) + ANSI(italic[0]) + '0' + ANSI(italic[1]) + ANSI(red[1]),
		'~> zero (chain)'
	);

	assert.is(
		terminalstyle.italic(`${terminalstyle.red(123)} ${terminalstyle.blue(0)}`),
		ANSI(italic[0]) + ANSI(red[0]) + '123' + ANSI(red[1]) + ' ' + ANSI(blue[0]) + '0' + ANSI(blue[1]) + ANSI(italic[1]),
		'~> positive (chain w/ nested)'
	);
});

test('nullish', () => {
	assert.is(terminalstyle.red(), undefined);
	assert.is(terminalstyle.red(null), null);
});

test('boolean', () => {
	let { red } = CODES;
	assert.is(terminalstyle.red(false), ANSI(red[0]) + 'false' + ANSI(red[1]));
	assert.is(terminalstyle.red(true), ANSI(red[0]) + 'true' + ANSI(red[1]));
});

// test('multiline', () => {
// 	let { blue, bold, red, italic } = CODES;
// 	assert.is(c.blue('hello\nworld'), ANSI(blue[0]) + 'hello' + ANSI(blue[1]) + '\n' + ANSI(blue[0]) + 'world' + ANSI(blue[1]), '~> basic');
// 	assert.is(c.blue.bold('hello\nworld'), ANSI(bold[0]) + ANSI(blue[0]) + 'hello' + ANSI(blue[1]) + ANSI(bold[1]) + '\n' + ANSI(bold[0]) + ANSI(blue[0]) + 'world' + ANSI(blue[1]) + ANSI(bold[1]), '~> simple chain');
// 	assert.is(c.italic.bold(`${c.red('hello')}\n${c.blue('world')}`), ANSI(bold[0]) + ANSI(italic[0]) + ANSI(red[0]) + 'hello' + ANSI(red[1]) + ANSI(italic[1]) + ANSI(bold[1]) + '\n' + ANSI(bold[0]) + ANSI(italic[0]) + ANSI(blue[0]) + 'world' + ANSI(blue[1]) + ANSI(italic[1]) + ANSI(bold[1]), '~> chain w/ nested');
// });

test('toggle support', () => {
	let { red } = CODES;

	terminalstyle.$.enabled = false;
	assert.is(terminalstyle.red('foo'), 'foo');

	terminalstyle.$.enabled = true;
	assert.is(terminalstyle.red('foo'), ANSI(red[0]) + 'foo' + ANSI(red[1]));
});

test.run();
