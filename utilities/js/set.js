function Set(comparisonFunction) {
   this.elements = [];
   this.compare = comparisonFunction;
}

Set.prototype.contains = function(element) {
   for(var i = 0; i < this.elements.length; i++)
      if(this.compare(this.elements[i], element))
         return true;
   return false;
}

Set.prototype.insert = function(element) {
   this.elements.push(element);
   return true;
}