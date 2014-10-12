using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Keyroll.Model
{
    public class Record
    {
        private string _Key 
            = null;
        private byte[] _Value
            = null;

        public Record() 
        {
        }

        public string Key 
        {
            get { return _Key; }
        }
    }
}
