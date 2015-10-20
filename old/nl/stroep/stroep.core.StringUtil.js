var stroep = stroep || {};
stroep.core = stroep.core || {};
stroep.core.StringUtil = {
	/*
	 * Replaces vars in a String. Vars defined between {}. Searches for a value in de object with the same name as the var.
	 *
	 * @example : simple
	   alert(  stroep.core.StringUtil.replaceVars("Hello my name is {name}", {name:"Mark"})  );
	 *
	 * @example : using nested objects
	   alert(  stroep.core.StringUtil.replaceVars("Hello my name is {person.name}, I'm {person.age} years old, I like {person.favorites.fruit}, but at most I like {person.favorites.fruit[2]}", {person:{name:"Mark", age:21, favorites:{fruit:["apples","oranges", "bananas"] }}})  );
	 *
	 * @example : using a function (note function is called from global scope)
	   function customFunction(age) { return age >= 21 ? "old" : "young"}
	   alert(  stroep.core.StringUtil.replaceVars("I'm {person.age} years, I feel {customFunction(person.age)}", {person:{age:21}})  );
	 * 
	 * @param 	value	string to replace
	 * @param 	props	object with properties
	 */
	replaceVars: function(value, props)
	{
		if (!value || !props) return value;
		
		var matches = value.match(/{.*?}/ig);
		for(var i = 0, leni = matches.length; i < leni; i++)
		{
			var match = matches[i];
			var matchValues = match.split(/{|}/ig).join("");
			
			value = value.split(match).join(stroep.core.StringUtil.findPropValue(match, matchValues, props));
		};
		return value;
	},
	
	findPropValue: function(match, matchValues, props)
	{
		var retval;
		
		if (matchValues.indexOf("(") > -1 && matchValues.indexOf(")") > -1) // parse function
		{
			var functionName = matchValues.split("(").shift();
			var functionArguments = matchValues.split("(").pop().split(")").shift().split(",");
			for(var k = 0, lenk = functionArguments.length; k < lenk; k++)
			{
				functionArguments[k] = this.findPropValue(null, functionArguments[k].split(" ").join(""), props);
			};
			
			var func = eval(functionName);
			if (func)
			{
				retval = func.apply(null, functionArguments);
			}
			else
			{
				throw "Invalid function " + functionName + ", does not exist. :: " + match;
				return match;
			};
		}
		else
		{
			var innerProps = props; // temp ref
			var matchList = matchValues.split(".");
			for(var j = 0, lenj = matchList.length; j < lenj; j++)
			{
				var matchValue = matchList[j];
				
				if (matchValue.indexOf("[") > -1 && matchValue.indexOf("]") > -1) // parse array
				{
					var arrayName = matchValue.split("[").shift();
					var index = matchValue.split("[").pop().split("]").shift();
					retval = innerProps[arrayName][index] || match;
					if (retval === match) break;
					innerProps = retval;
				}
				else // normal values
				{
					if (typeof(innerProps[matchValue]) == "number")
					{
						retval = innerProps[matchValue];
					}
					else
					{
						retval = innerProps[matchValue] || match;
					};
					if (retval === match) break;
					innerProps = retval;
				};
			};
		};
		return retval;
	}
};