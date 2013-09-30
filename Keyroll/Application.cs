using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Keyroll.UI;

namespace Keyroll
{
    public class AppData
    {
        private static FrmMain _FormMain = null;
        public static FrmMain FormMain 
        {
            get 
            {
                if (_FormMain == null) _FormMain = new FrmMain();
                return _FormMain;
            }
        }
    }
}
