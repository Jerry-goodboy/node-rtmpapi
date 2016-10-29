/**
 * Created by delian on 3/11/14.
 * Easy implementation of Logging. Always print Data and some prefix in front of it
 */

var encodeLookup = '0123456789abcdef'.split('');
var decodeLookup = [];
var i = 0;
while (i < 10) decodeLookup[0x30 + i] = i++;
while (i < 16) decodeLookup[0x61 - 10 + i] = i++;

function dumpArray(array, type, headLen, lineLen)
{
	var length = array.length;
	var string = '';
	var c, i = 0;
	if (type == 'char')
	{
		while (i < length)
		{
			c = array[i++];
			if (c > 32 && c <= 126)
				string += String.fromCharCode(c);
			else
				string += '.';
			if (i >= headLen && (i - headLen) % (2 * lineLen) == 0)
				string += '\n';
			else if (i == headLen || (i > headLen && (i - headLen) % lineLen == 0))
				string += '  ';
		}
	} else
	{
		while (i < length)
		{
			c = array[i++];
			string += encodeLookup[(c & 0xF0) >> 4] + encodeLookup[c & 0xF];
			string += ' ';
			if (i >= headLen && (i - headLen) % (2 * lineLen) == 0)
				string += '\n';
			else if (i == headLen || (i > headLen && (i - headLen) % lineLen == 0))
				string += '  ';
		}
	}
	return string
}

module.exports = function (sDebug, sRaddr)
{
	var debug = sDebug;
	var raddr = sRaddr || 'none';

	return {
		log: function ()
		{
			if (debug)
			{
				for (var z = [], k = arguments.length - 1; k >= 0; k--) z[k] = arguments[k];
				//console.log.apply(this, z);//[/*new Date,raddr,*/'>'].concat(z));
				
			}
		},
		debug: function (sDebug)
		{
			debug = sDebug;
		},
		raddr: function (sRaddr)
		{
			raddr = sRaddr;
		},

		dumpArray: function (array, type, headLen, lineLen)
		{
			console.log(dumpArray(array, type, headLen, lineLen));
		}

	};
};

