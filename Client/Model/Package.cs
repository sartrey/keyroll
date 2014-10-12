using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Keyroll.Model
{
    public class Package
    {
        private List<Domain> _Domains 
            = new List<Domain>();

        private string _CodeHash
            = null;

        public static Package Load(string path, string code) 
        {
            return null;
        }
    }
}
