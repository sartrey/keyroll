using Keyroll.Shell;
using Keyroll.TDS;

namespace Keyroll
{
    public class Runtime
    {
        private static Runtime _Instance 
            = new Runtime();

        public static Runtime Instance 
        {
            get { return _Instance; }
        }

        private Storage _Storage = null;
        private Router _Router = null;

        public Storage Storage
        {
            get { return _Storage; }
            set { _Storage = value; }
        }

        public Router Router
        {
            get { return _Router; }
            set { _Router = value; }
        }
    }
}
