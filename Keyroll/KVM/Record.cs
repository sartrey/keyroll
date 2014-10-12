using System;

namespace Keyroll.KVM
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

        public byte[] Value
        {
            get { return _Value; }
        }

        public string GetBase64Value()
        {
            return Convert.ToBase64String(_Value);
        }
    }
}
