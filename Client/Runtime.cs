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

        public Storage Storage
        {
            get { return _Storage; }
            set { _Storage = value; }
        }
    }
}
