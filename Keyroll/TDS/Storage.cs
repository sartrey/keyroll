using System.Collections.Generic;
using System.IO;
using System.IO.Compression;
using System.Xml.Linq;

namespace Keyroll.TDS
{
    public class Storage
    {
        private string _Path = null;
        private StorageHeader _Header = null;
        private List<Asset> _Assets 
            = new List<Asset>();

        public string Path 
        {
            get { return _Path; }
            set { _Path = value; }
        }

        public Asset this[string id]
        {
            get 
            {
                foreach (var asset in _Assets)
                    if (asset.Id == id)
                        return asset;
                return null;
            }
        }

        protected Storage() { }

        private void LoadAssets(XElement xml)
        {
            var xml_root = xml.Element("root");
            foreach (var xml_asset in xml_root.Elements("asset"))
            {
                var asset = Asset.Parse(xml_asset);
                if (asset != null)
                {
                    _Assets.Add(asset);
                    asset.Storage = this;
                }
            }
        }

        private XElement SaveAssets() 
        {
            var xml = new XElement("root");
            foreach (var asset in _Assets)
                xml.Add(asset.ToXML());
            return xml;
        }

        /// <summary>
        /// load storage
        /// </summary>
        public static Storage Load(string path, string key)
        {
            var stream = File.Open(path, FileMode.Open);
            var archive = new ZipArchive(stream, ZipArchiveMode.Read);
            var header_entry = archive.GetEntry("header.xml");
            var header_stream = header_entry.Open();
            var header_xml = XElement.Load(header_stream);
            var header = StorageHeader.Parse(header_xml);

            if (!header.ValidKey(key))
            {
                header_stream.Close();
                stream.Close();
                archive.Dispose();
                return null;
            }

            var storage = new Storage();
            storage._Path = path;
            storage._Header = header;

            var assets_entry = archive.GetEntry("assets.xml");
            var assets_stream = assets_entry.Open();
            var assets_xml = XElement.Load(assets_stream);
            storage.LoadAssets(assets_xml);

            header_stream.Close();
            assets_stream.Close();
            stream.Close();
            archive.Dispose();
            return storage;
        }

        /// <summary>
        /// create storage instance without physical entity
        /// </summary>
        public static Storage Create(string path, string key)
        {
            var storage = new Storage();
            storage._Path = path;
            var header = new StorageHeader();
            header.SetKey(null, key);
            storage._Header = header;
            return storage;
        }

        /// <summary>
        /// commit storage changes to device
        /// </summary>
        public void Commit()
        {
            var stream = File.Open(_Path, FileMode.OpenOrCreate, FileAccess.ReadWrite);
            var archive = new ZipArchive(stream, ZipArchiveMode.Update);

            var header_entry = archive.GetEntry("header.xml");
            if (header_entry == null)
                header_entry = archive.CreateEntry("header.xml");
            var header_stream = header_entry.Open();
            var header_xml = _Header.ToXML();
            header_xml.Save(header_stream);
            header_stream.Close();

            var assets_entry = archive.GetEntry("assets.xml");
            if (assets_entry == null)
                assets_entry = archive.CreateEntry("assets.xml");
            var assets_stream = assets_entry.Open();
            var assets_xml = SaveAssets();
            assets_xml.Save(assets_stream);
            assets_stream.Close();
        }

        public void AddAsset(Asset asset)
        {
            if(!_Assets.Contains(asset))
                _Assets.Add(asset);
        }

        public void RemoveAsset(Asset asset)
        {
            if (_Assets.Contains(asset))
                _Assets.Remove(asset);
        }
    }
}